const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

function assignManager(){
    inquirer
    .prompt([
        {
          type: 'input',  
          message: 'Enter Manager Name',
          name: 'managerName'
        },
        {
          type: 'input',
          message: 'Manager Employee ID:',
          name: 'managerID'
        },
        {
          type: 'input',
          message: 'Manager\'s email address:',
          name: 'managerEmail'
        },
        {
          type: 'input',
          message: 'Manager\'s Office Phone #:',
          name: 'managerPhone'
        }
      ])
      .then(function(response){
        const manager = new Manager(response.managerName,response.managerID,
                                    response.managerEmail,response.managerPhone);
      });
}

assignManager();