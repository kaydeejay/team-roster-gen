const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

function buildTeam(){
  assignManager()
  .then(managerResponse => addRole(managerResponse))
  .catch(err => console.log(err));
}

function assignManager(){
    return new Promise((res) => {
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
        const team = [];
        const manager = new Manager(response.managerName,response.managerID,
                                    response.managerEmail,response.managerPhone);                            
        team.push(manager);
        // console.log(team);
        res(team);
      });
    });
}

function addRole(team){
  return new Promise((res,rej) => {
    if (team.find(el => el.getRole() === 'Manager')){
      inquirer
      .prompt({
        type: 'list',
        message: 'Assign your next teammate',
        choices: ['Engineer','Intern','No more team members'],
        name: 'newRole'
      }).then(function(response){
        console.log(response);
        memberSwitchboard(response.newRole);
        res(response);
      })
    } else {
      rej("Error: Team needs a manager before you can assign more roles");
    }
  });
}

function memberSwitchboard(str){
  switch (str){
    case 'Engineer':
      console.log('Engineer');
      break;
    default:
      console.log('something else');
      break;
  }
}

buildTeam();