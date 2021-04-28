const Employee = require('./employee');
const Department = require('./department');
const Role = require('./role');

Role.hasOne(Employee, {
  foreignKey: 'role_id',
});

Employee.belongsTo(Role, {
  foreignKey: 'role_id',
});

Department.hasMany(Role, {
  foreignKey: 'department_id',
});

Role.belongsTo(Department, {
  foreignKey: 'department_id',
});


module.exports = { Employee, Department, Role };
