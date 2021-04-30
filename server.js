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


function createNewEmployee(){
 console.log('employee made')
 promtQuestion();
}


function createNewDepartment(){
  console.log('Department made')
  promtQuestion();
};

function createNewRole(){
  console.log('Role made')
  promtQuestion();
};

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

function startApp(){
  promtQuestion();
}

startApp()



