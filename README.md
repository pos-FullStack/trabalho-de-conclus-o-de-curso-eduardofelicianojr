# VELHA DA FIGURA DE LINGUAGEM
Software desenvolvido para o Trabalho de Conclusão de Curso (TCC) apresentado como exigência para obtenção do título de Especialista em Desenvolvimento Full Stack do Instituto Federal do Sudeste de Minas Gerais - Campus Manhuaçu.

EDUARDO LUIZ FELICIANO JÚNIOR - 2025

**Objetivo**: Desenvolver um sistema gamificado denominado “Velha da Figura de Linguagem”, baseado no jogo da velha, com o objetivo de auxiliar estudantes na aprendizagem e fixação de figuras de linguagem por meio de desafios interativos e dinâmicos.

## Guia de Instalação

## Estrutura Inicial do Projeto

src/

├── config/          # Configurações do banco de dados

├── controllers/     # Lógica de negócio

├── models/          # Modelos Sequelize

├── routes/          # Rotas da aplicação

├── views/           # Templates Handlebars

├── public/          # Arquivos estáticos (CSS, JS, imagens)

└── app.js           # Arquivo principal da aplicação


**Requisitos**

Antes de iniciar, certifique-se de ter instalado:

Node.js (v18 ou superior)

NPM

MySQL Server (v8.0 ou superior)

MySQL Workbench

Navegador web atualizado

# CLONAR O REPOSITÓRIO
git clone https://github.com/pos-FullStack/trabalho-de-conclus-o-de-curso-eduardofelicianojr.git
cd velha-figura-linguagem

# INSTALAR AS DEPENDÊNCIAS
npm install

# CRIAR O BANDO DE DADOS NO MYSQL
CREATE DATABASE velha_figura_linguagem;

# EDITAR O ARQUIVO src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'velha_figura_linguagem',
  'root',
  'sua_senha',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;

# EXECUTAR APLICAÇÃO
npm run dev

# ACESSO AO SISTEMA

**Login do Professor:**
http://localhost:3000/login

**Área Administrativa:**
http://localhost:3000/admin/dashboard

**Acesso ao Jogo (Aluno):**
http://localhost:3000/jogo
