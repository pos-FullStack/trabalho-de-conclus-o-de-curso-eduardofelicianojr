const { Jogo, Jogador } = require('../models');

exports.paginaLogin = (req, res) => {
    res.render('auth/jogador');
};

exports.login = async (req, res) => {
    try {
        const { nome, pin } = req.body;

        if (!nome || !pin) {
            return res.render('auth/jogador', {
                error: 'Preencha todos os campos.'
            });
        }

        // Verifica se o jogo existe e está ativo
        const jogo = await Jogo.findOne({
            where: {
                pin,
                status: 'ativo'
            }
        });

        if (!jogo) {
            return res.render('auth/jogador', {
                error: 'PIN inválido ou jogo finalizado.'
            });
        }

        // Cria jogador
        const jogador = await Jogador.create({
            nome,
            jogo_id: jogo.id
        });

        // Salva sessão
        req.session.jogadorId = jogador.id;
        req.session.jogoId = jogo.id;
        req.session.jogoPin = jogo.pin;

        res.redirect('/jogo');

    } catch (error) {
        console.error(error);
        res.render('auth/jogador', {
            error: 'Erro ao entrar no jogo.'
        });
    }
};