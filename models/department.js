const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {
  constructor(department_name){
    this.department_name = department_name;
}
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department'
  }
);

module.exports = Department;
