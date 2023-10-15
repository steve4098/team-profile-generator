const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = []
const idList = []

const appMenu = () => {

    function buildTeam () {

    }

    function addIntern() {

    }

    function addEngineer() {
        inquirer.prompt([
          {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
            validate: answer => {
                if (answer !== ""){
                    return true
                }
                else return "Please enter the engineer's name"
            }
          },
          {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's ID?",
            validate: answer => {
                if (answer !== ""){
                    return true
                }
                else return "Please enter the engineer's ID"
            }
          },
          {
            type: "input",
            name: "engineerEmail",
            message: "Please enter the engineer's email address",
            validate: answer => {
                if (answer !== ""){
                    return true
                }
                else return "Please enter the engineer's email address"
            }
          },
          {
            type: "input",
            name: "engineerGithub",
            message: "Please enter their GitHub username",
            validate: answer => {
                if (answer !== ""){
                    return true
                }
                else return "Please enter the engineer's GitHub username"
            }
          }
        ])
    }

    function createTeam() {
        inquirer.prompt([
          {
            type: "list",
            name: "memberChoice",
            message: "What team member role would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "No further team members"
            ]
          }  
        ]).then(userChoice => {
            if(userChoice.memberChoice === "Engineer") {
                //Add Engineer
            } else if (userChoice.memberChoice === "Intern" {
                //Add Intern
            }) else {
                //buildTeam();
            }
        })
    }



    function createManager() {
        console.log("Create your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Who is the team manager?",
                validate: answer => {
                    if (answer !== ""){
                        return true
                    }
                    else return "Please enter the manager's name"
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the manager's ID?",
                validate: answer => {
                    if (answer !== ""){
                        return true
                    }
                    else return "Please enter the manager's ID"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email address?",
                validate: answer => {
                    if (answer !== ""){
                        return true
                    }
                    else return "Please enter the manager's email address"
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Which office does the manager work in?",
                validate: answer => {
                    if (answer === "" || answer === NaN){
                        return "Please enter the manager's Office Number"
                    }
                    else return true
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })

    }

    createManager();
}

appMenu();

path.resolve(__dirname, "output");
path.join(OUTPUT_DIR, "teamsheet.html")
