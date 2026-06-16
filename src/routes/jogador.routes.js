const express = require('express');
const router = express.Router();
const jogadorController = require('../controllers/jogadorController');
const authJogador = require('../middleware/authJogador');
const { Jogada, Jogo, Questao, Jogador } = require('../models');

// Página de login do jogador
router.get('/entrar', jogadorController.paginaLogin);

// Processar login
router.post('/entrar', jogadorController.login);

// Página principal do jogo (protegida)
router.get('/jogo', authJogador, async (req, res) => {
    try {
        const jogador = await Jogador.findByPk(req.session.jogadorId);

        if (!jogador) return res.redirect('/entrar');

        // Renderiza a view do jogo com tabuleiro, nome e PIN
        res.render('jogador/jogo', {
            jogadorNome: jogador.nome,
            session: req.session,
            tabuleiroArray: [0, 1, 2, 3, 4, 5, 6, 7, 8] // exemplo 3x3
        });

    } catch (error) {
        console.error(error);
        res.redirect('/entrar');
    }
});

// Receber jogadas do jogador
router.post('/jogada', authJogador, async (req, res) => {
    try {
        const { posicao, resposta } = req.body;
        const jogadorId = req.session.jogadorId;
        const jogoId = req.session.jogoId;

        if (!resposta) {
            return res.status(400).json({ error: 'Resposta não informada' });
        }

        // Buscar o jogo ativo com questões vinculadas usando o alias correto
        const jogoAtivo = await Jogo.findOne({
            where: { id: jogoId, status: 'ativo' },
            include: { model: Questao, as: 'Questoes', through: { attributes: [] } }
        });

        if (!jogoAtivo || !jogoAtivo.Questoes || jogoAtivo.Questoes.length === 0) {
            return res.json({ correta: false, error: 'Não há questões disponíveis.' });
        }

        // Pega uma questão aleatória
        const questao = jogoAtivo.Questoes[Math.floor(Math.random() * jogoAtivo.Questoes.length)];

        // Verifica se a resposta está correta
        const correta = resposta.toUpperCase() === questao.correta.toUpperCase();

        // Salva a jogada no banco
        await Jogada.create({
            jogador_id: jogadorId,
            questao_id: questao.id,
            posicao_tabuleiro: posicao,
            resposta_dada: resposta.toUpperCase(),
            correta,
            data_hora: new Date()
        });

        // Retorna resultado para o front-end
        res.json({
            correta,
            alternativaCorreta: questao.correta, // obrigatório
            feedback: questao.feedback
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar jogada.' });
    }
});

// Retornar próxima questão para modal
router.get('/proxima-questao', authJogador, async (req, res) => {
    try {
        const jogoId = req.session.jogoId;

        const jogo = await Jogo.findByPk(jogoId, {
            include: { model: Questao, as: 'Questoes', through: { attributes: [] } }
        });

        if (!jogo || !jogo.Questoes || jogo.Questoes.length === 0) {
            return res.status(404).json({ error: 'Não há questões disponíveis.' });
        }

        // Questão aleatória
        const questao = jogo.Questoes[Math.floor(Math.random() * jogo.Questoes.length)];

        res.json({
            id: questao.id,
            enunciado: questao.enunciado,
            alternativas: {
                A: questao.alternativaA,
                B: questao.alternativaB,
                C: questao.alternativaC,
                D: questao.alternativaD
            },
            correta: questao.correta,
            feedback: questao.feedback
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar questão.' });
    }
});

module.exports = router;