const express = require('express');
const bcrypt = require('bcryptjs'); // Para criptografar senhas
const jwt = require('jsonwebtoken'); // Para gerar tokens de autenticação
const Usuario = require('../models/usuario');

const router = express.Router(); // Cria um roteador do Express

// Rota para registrar um novo usuário
router.post('/register', async (requisicao, resposta) => {
  const { nome, email, senha, cpf, rg, endereco, cidade, estado, cep } = requisicao.body; 
  try {
    const usuario = await Usuario.create({ nome, email, senha, cpf, rg, endereco, cidade, estado, cep });
    resposta.status(201).json(usuario); 
  } catch (error) {
    resposta.status(400).json({ mensagem: 'Erro ao registrar usuário.' }); 
  }
});

// Rota para login do usuário
router.post('/login', async (requisicao, resposta) => {
  const { email, senha } = requisicao.body; 
  const usuario = await Usuario.findOne({ where: { email } }); // Busca o usuário no banco de dados pelo e-mail

  // Verifica se o usuário existe e se a senha está correta
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return resposta.status(400).json({ mensagem: 'Credenciais inválidas.' });
  }

  // Gera um token JWT para autenticação, válido por 1 hora
  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Retorna o token e os dados básicos do usuário
  resposta.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
});




module.exports = router;  