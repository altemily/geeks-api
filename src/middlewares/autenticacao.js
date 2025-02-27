const jwt = require('jsonwebtoken');

const autenticacao = (requisicao, resposta, next) => {
  // Obtém o token do cabeçalho da requisição e remove "Bearer " se estiver presente
  const token = requisicao.header('Autorizacao')?.replace('Bearer ', '');

  // Verifica se o token foi fornecido
  if (!token) {
    return resposta.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado; // Armazena os dados do usuário decodificado na requisição
    next(); // Passa para o próximo middleware
  } catch (error) {
    res.status(400).json({ mensagem: 'Token inválido.' });
  }
};



module.exports = autenticacao;