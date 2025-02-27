const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o modelo "Produto" no Sequelize
const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  estoque: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    defaultValue: 0, // Padrão: 0 itens no estoque
  },
  formas_pagamento: {
    type: DataTypes.ENUM('Cartão à vista', 'Cartão em até 12x sem juros', 'Boleto', 'Pix'),
    allowNull: false,
  },
});


module.exports = Produto;