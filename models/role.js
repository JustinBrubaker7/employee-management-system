const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {
//   constructor(title, salary, department){
//     this.title = title;
//     this.salary = salary;
//     this.department = department;
  
// }
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'department',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Role',
  }
);

module.exports = Role;
