const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// main function
  // declares empty team array variable
  // calls function to determine whether or not to add another team member
    // if yes, obtains role, name, id, email
    // if no, calls function to build html page with the team array
  // depending on role from previous function, obtains unique attribute and
    // adds it to the employee object.
  // push employee to team
  // Repeats the cycle

function buildTeam(){
  const team = [];
  addMore()
  .then(addMoreResponse => emplDetails(addMoreResponse))
  .then(emplDetailsResponse => testFunction(emplDetailsResponse))
  .catch(err => {
    if (err === 'Team Complete'){
      generateHTML();
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

function testFunction(obj){
  console.log(obj);
}


// for now, don't code below this line. I want the generateHTML function to 
// be the last thing before buildTeam()



buildTeam();