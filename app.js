const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const team = [];

function buildTeam(){
  addMore()
  .then(addMoreResponse => emplDetails(addMoreResponse))
  .then(emplDetailsResponse => assignRole(emplDetailsResponse))
  .then(assignRoleResponse => {
    team.push(assignRoleResponse);
    buildTeam();
  })
  .catch(err => {
    if (err === 'Team Complete'){
      generateHTML(team);
    } else {
      console.log(err);
    }
  });
}

function addMore(){
  return new Promise((res,rej) => {
    inquirer
    .prompt({
      type: 'confirm',
      message: 'Add another team member?',
      name: 'bool'
    }).then(function(response){
      response.bool ? res(response.bool) : rej('Team Complete');
    });
  });
}

function emplDetails(bool){
  return new Promise((res,rej) => {
    if (bool === true) {
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'Employee Name:',
          name: 'employeeName'
        },
        {
          type: 'list',
          message: 'Employee Role:',
          choices: ['Manager','Engineer','Intern'],
          name: 'employeeRole'
        },
        {
          type: 'input',
          message: 'Employee ID:',
          name: 'employeeID'
        },
        {
          type: 'input',
          message: "Employee's email address:",
          name: 'employeeEmail'
        }
      ]).then(function(response){
        res(response);
      });
    } else { rej('Oops, something went wrong.') }
  });
}

function assignRole(employee){
  return new Promise(res => {
    const role = employee.employeeRole;
    switch (role){
        case 'Manager':
          inquirer
          .prompt({
            type: 'input',
            message: 'Employee\'s Office Number:',
            name: 'employeePhone'
          }).then(function(response){
            employee.employeePhone = response.employeePhone;
            const newManager = new Manager(employee.employeeName, employee.employeeID,
              employee.employeeEmail, employee.employeePhone);
            res(newManager);
          });
          break;
        case 'Engineer':
          inquirer
          .prompt({
            type: 'input',
            message: 'Employee\'s Github Username:',
            name: 'employeeGithub'
          }).then(function(response){
            employee.employeeGithub = response.employeeGithub;
            const newEngineer = new Engineer(employee.employeeName, employee.employeeID,
              employee.employeeEmail, employee.employeeGithub);
            res(newEngineer);
          });
          break;
        case 'Intern':
          inquirer
          .prompt({
            type: 'input',
            message: 'Employee\'s School:',
            name: 'employeeSchool'
          }).then(function(response){
            employee.employeeSchool = response.employeeSchool;
            const newIntern = new Intern(employee.employeeName, employee.employeeID,
              employee.employeeEmail, employee.employeeSchool);
            res(newIntern);
          });
          break;
      }
  });
}

function generateHTML(arr){
  console.log('the generateHTML function has been invoked.');
  console.log(arr[0].name);
}

buildTeam();