const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const { Employee, Role, Department } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);





function startApp(){
  promtQuestion();
}

function promtQuestion(){
  inquirer.prompt({
    type: "list",
    name: "newAddition",
    message: "Do you want to add a department, role, or an employee?",
    choices: [
      "Department",
      "Role",
      "Employee",
      "Exit",
    ]
  }).then((choice) => {    
  if(choice.newAddition === "Department"){
    createNewDepartment();
  } else if(choice.newAddition === "Role"){
    createNewRole();
  } else if(choice.newAddition === "Employee"){
    createNewEmployee()
  } else {
    console.log("Thanks for adding! Good bye")
    return;
  }
  })
}


async function createNewEmployee(){

  const allRoles = await Role.findAll({
    raw : true
  })
    inquirer.prompt([
      {
        type: "Input",
        name: "firstName",
        message: "What is the employee's last name?"
      },
      {
        type: "Input",
        name: "LastName",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "role",
        message: "whatis the employee's role?",
        choices: allRoles,
      }
    ]).then(async (answers)  => {

      
        const newEmployee = await Employee.create({
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: role,
      });
      console.log(`${answers.roleTitle} has now been added as a role.\n`)
      promtQuestion();
    })
    
  } 





 //ask qusetions to get information
 //sequalize command .create to make a new insertion


function createNewDepartment(){
  inquirer.prompt([
    {
      type: "Input",
      name: "departmentName",
      message: "What is the department's name?"
    }
  ]).then(async (answer)  => {
    const newDepartment = await Department.create({
      name: answer.departmentName,
    });
    console.log(`${answer.departmentName} has now been added as a department.\n`)
    promtQuestion();
  })

};

async function createNewRole(){
  try{
    const allDepartments = await Department.findAll({
      raw : true
    })
    // console.log(allDepartments)
    // console.log(allDepartments[1].name)
    // console.log(allDepartments[2].id)
    
    inquirer.prompt([
      {
        type: "Input",
        name: "roleTitle",
        message: "What is the title of this role?"
      },
      {
        type: "Input",
        name: "salary",
        message: "What is salary of this role?"
      },
      {
        type: "list",
        name: "department",
        message: "what department is this role in?",
        choices: allDepartments,
      }
    ]).then(async (answers)  => {

      //need to find the array index of allDepartments where answers.department matches it.
      
         const newRole = await Role.create({
        title: answers.roleTitle,
        salary: answers.salary,
        department_id: allDepartments[1].id
      });
      console.log(`${answers.roleTitle} has now been added as a role.\n`)
      promtQuestion();
    })
  } catch (err) {
    console.log(err)
  }

};

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

function startApp(){
  promtQuestion();
}

startApp()



