const { Jogada, Jogador, Jogo } = require('../models');
const { fn, col, literal, Op } = require('sequelize');

module.exports = {
  async listar(req, res) {
    try {
      const { pin, data, jogador } = req.query;

      const where = {};

      if (jogador) {
        where['$jogador.nome$'] = {
          [Op.like]: `%${jogador}%`
        };
      }

      if (pin) {
        where['$jogador.jogo.pin$'] = pin;
      }

      if (data) {
        const inicio = new Date(data + ' 00:00:00');
        const fim = new Date(data + ' 23:59:59');

        where['$jogador.jogo.data_criacao$'] = {
          [Op.between]: [inicio, fim]
        };
      }

      const relatorios = await Jogada.findAll({
        attributes: [
          [col('jogador.jogo.pin'), 'pin'],
          [col('jogador.nome'), 'jogador'],
          [fn('SUM', literal('CASE WHEN correta = 1 THEN 1 ELSE 0 END')), 'acertos'],
          [fn('SUM', literal('CASE WHEN correta = 0 THEN 1 ELSE 0 END')), 'erros']
        ],

        include: [
          {
            model: Jogador,
            attributes: [],
            include: [
              {
                model: Jogo,
                attributes: []
              }
            ]
          }
        ],

        where,

        group: [
          'jogador.jogo.pin',
          'jogador.id',
          'jogador.nome'
        ],

        order: [
          [col('jogador.jogo.pin'), 'DESC']
        ],

        raw: true
      });

      const chartLabels = JSON.stringify(
        relatorios.map(item => item.jogador)
      );

      const chartAcertos = JSON.stringify(
        relatorios.map(item => Number(item.acertos))
      );

      const chartErros = JSON.stringify(
        relatorios.map(item => Number(item.erros))
      );

      res.render('admin/insights', {
        titulo: 'Insights Pedagógicos',
        relatorios,
        filtros: { pin, data, jogador },
        chartLabels,
        chartAcertos,
        chartErros
      });

    } catch (erro) {
      console.log(erro);
      res.status(500).send('Erro ao carregar insights.');
    }
  }
};