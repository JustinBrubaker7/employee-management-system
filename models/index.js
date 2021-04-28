const Employee = require('./employee');
const Department = require('./department');
const Role = require('./role');

// Employee.hasOne(Role, {
//   foreignKey: 'employee_id',
//   onDelete: 'CASCADE',
// });

// Role.belongsTo(Employee, {
//   foreignKey: 'employee_id',
// });

// Role.hasOne(Department, {
//   foreignKey: 'department_id',
//   onDelete: 'CASCADE',
// });

// Department.belongsTo(Employee, {
//   foreignKey: 'department_id',
// });


module.exports = { Employee, Department, Role };
