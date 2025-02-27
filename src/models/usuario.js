const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs'); // Importa a biblioteca para criptografia de senhas

// Define o modelo "Usuario" no Sequelize
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Antes de criar um novo usuário, criptografa a senha
Usuario.beforeCreate(async (usuario) => {
  usuario.senha = await bcrypt.hash(usuario.senha, 10); // Aplica hash na senha com fator de custo 10
});

module.exports = Usuario;
