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

//variable to build team structure
const appMenu = () => {
    //builds team when all members are added
    function buildTeam () {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

    }
    //function to add a new team member with class of Intern
    function addIntern() {
        inquirer.prompt([
            {
              type: "input",
              name: "internName",
              message: "What is the intern's name?",
              validate: answer => {
                  if (answer !== ""){
                      return true
                  }
                  else return "Please enter the intern's name"
              }
            },
            {
              type: "input",
              name: "internId",
              message: "What is the intern's ID?",
              validate: answer => {
                  if (answer !== ""){
                      return true
                  }
                  else return "Please enter the intern's ID"
              }
            },
            {
              type: "input",
              name: "internEmail",
              message: "Please enter the intern's email address",
              validate: answer => {
                  if (answer !== ""){
                      return true
                  }
                  else return "Please enter the intern's email address"
              }
            },
            {
              type: "input",
              name: "internSchool",
              message: "Please enter their school",
              validate: answer => {
                  if (answer !== ""){
                      return true
                  }
                  else return "Please enter the intern's school"
              }
            }
          ]).then(answers => {
              const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
              teamMembers.push(intern);
              idList.push(answers.internId);
             // console.log(intern);
              createTeam();
          })
    }
        //function to add a new team member with class of Engineer
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
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
           // console.log(engineer);
            createTeam();
        })
    }

    //sends prompt to create a new team member or declare team finished
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
                addEngineer();

            } else if (userChoice.memberChoice === "Intern") {
                //Add Intern
                addIntern();

            } else {
                //buildTeam();
                buildTeam();
            }
        })
    }


    //function to add a new team manager
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
           // console.log(manager);
            createTeam();
        })

    }

    createManager();
}

appMenu();

path.resolve(__dirname, "output");
path.join(OUTPUT_DIR, "teamsheet.html")
