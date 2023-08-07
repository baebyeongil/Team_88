const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const Card = connector.sequelize.define(
  'cards',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    columnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deadLine: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Card;
