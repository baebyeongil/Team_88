const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const CheckList = connector.sequelize.define('checkList', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isSuccess: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: false,
  },
});

module.exports = CheckList;
