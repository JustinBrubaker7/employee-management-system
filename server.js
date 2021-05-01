const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const { Employee, Role, Department } = require('./models');
const cTable = require('console.table');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);




async function consoleTable(){

  const allRoles = await Role.findAll({
    raw : true
  })
  //console.log(allRoles)
  console.table(allRoles)
}




async function startApp(){
  await consoleTable()
  await promtQuestion();
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
  let roleTitles = []
  let chosenRole
  const allRoles = await Role.findAll({
    raw : true
  })

  for(let i = 0; i < allRoles.length; i++){
    roleTitles.push(allRoles[i].title)
  }
    inquirer.prompt([
      {
        type: "Input",
        name: "firstName",
        message: "What is the employee's first name?"
      },
      {
        type: "Input",
        name: "lastName",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "role",
        message: "whatis the employee's role?",
        choices: roleTitles,
      }
    ]).then(async (answers)  => {
      for(let i = 0; i < allRoles.length; i++){
        if(answers.role === allRoles[i].title){
          chosenRole = allRoles[i].id;
        }
      }
        const newEmployee = await Employee.create({
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: chosenRole,
      });
      console.log(`${answers.firstName}${answers.lastName} has now been added as an employee.\n`)
      promtQuestion();
    })
    
  } 



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
  let departmentNames = [];
  let chosenDepartment
  try{
    const allDepartments = await Department.findAll({
      raw : true
    })

    for(let i = 0; i < allDepartments.length; i++){
      departmentNames.push(allDepartments[i].name)
    }
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
        choices: departmentNames,
      }
    ]).then(async (answers)  => {

      for(let i = 0; i < allDepartments.length; i++){
        if(answers.department === allDepartments[i].name){
          chosenDepartment = allDepartments[i].id;
        }
      }
      
         const newRole = await Role.create({
        title: answers.roleTitle,
        salary: answers.salary,
        department_id: chosenDepartment
      });
      console.log(`${answers.roleTitle} has now been added as a role.\n`)
      promtQuestion();
    })
  } catch (err) {
    console.log(err)
  }

};

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('\n'));
});

startApp()



