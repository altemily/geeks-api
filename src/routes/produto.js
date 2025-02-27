const express = require('express');
const auth = require('../middleware/auth');
const Produto = require('../models/produto');
const router = express.Router();

// Criar produto (apenas para usuários autenticados)
router.post('/', auth, async (requisicao, resposta) => {
  const { nome, descricao, preco, estoque, formas_pagamento } = requisicao.body;

  try {
    const produto = await Produto.create({ nome, descricao, preco, estoque, formas_pagamento });
    resposta.status(201).json(produto); 
  } catch (error) {
    resposta.status(400).json({ message: 'Erro ao criar produto.' }); 
  }
});

// Listar produtos
router.get('/', async (requisicao, resposta) => {
  try {
    const produtos = await Produto.findAll(); 
    resposta.json(produtos);
  } catch (error) {
    resposta.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
});





module.exports = router;