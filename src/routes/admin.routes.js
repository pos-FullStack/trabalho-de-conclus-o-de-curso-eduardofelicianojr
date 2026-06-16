const express = require('express');
const router = express.Router();

const QuestaoController = require('../controllers/QuestaoController');
const JogoController = require('../controllers/JogoController');
const JogoQuestaoController = require('../controllers/JogoQuestaoController');
const InsightsController = require('../controllers/InsightsController');

// Dashboard
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', {
    titulo: 'Área Administrativa - Velha da Figura de Linguagem'
  });
});

// Questões
router.get('/questoes', QuestaoController.listar);
router.get('/questoes/nova', QuestaoController.nova);
router.post('/questoes/salvar', QuestaoController.salvar);
router.get('/questoes/editar/:id', QuestaoController.editar);
router.post('/questoes/atualizar/:id', QuestaoController.atualizar);
router.post('/questoes/excluir/:id', QuestaoController.excluir);

// Jogos
router.get('/jogos', JogoController.listar);
router.get('/jogos/novo', JogoController.nova);
router.post('/jogos/novo', JogoController.salvar);
router.get('/jogos/excluir/:id', JogoController.excluir);

// Gerenciar questões do jogo
router.get('/jogos/questoes/:jogoId', JogoQuestaoController.gerenciar);
router.post('/jogos/questoes/:jogoId', JogoQuestaoController.salvar);

//Insights Pedagógicos
router.get('/insights', InsightsController.listar);

module.exports = router;