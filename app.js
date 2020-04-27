//Dependencies
const inquirer = require("inquirer");
const Joi = require("joi");
const fs = require("fs");
const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const genTeam = require("./templates/generateTeam")
const genHTML= require("./templates/generateHTML")
const genManager = require("./templates/generateManager")
const genEngineer = require("./templates/generateEngineer")
const genIntern = require("./templates/generateIntern")

let id = 0;
let team = [];

//Inquirer Questions
const managerQs = [
    {
        type: "input",
        name: "name",
        message: "Please enter manager's name.",
        validate: validName,
    },{
        type: "input",
        name: "email",
        message: "Please enter manager's email.",
        validate: validEmail,
    },{
        type: "input",
        name: "officeNumber",
        message: "Please enter manager's office number.",
    }
]

const engineerQs = [
    {
        type: "input",
        name: "name",
        message: "Please enter engineer's name.",
        validate: validName,
    },{
        type: "input",
        name: "email",
        message: "Please enter engineer's email.",
        validate: validEmail,
    },{
        type: "input",
        name: "github",
        message: "Please enter engineer's github username.",
    }
]

const internQs = [
    {
        type: "input",
        name: "name",
        message: "Please enter intern's name.",
        validate: validName,
    },{
        type: "input",
        name: "email",
        message: "Please enter intern's email.",
        validate: validEmail,
    },{
        type: "input",
        name: "school",
        message: "Please enter intern's school name.",
    }
]

const choices = [
    {
        type: "list",
        name: "choice",
        message: "To add another team member, choose a role. To finish, choose 'EXIT'.",
        choices: [
            "Engineer",
            "Intern",
            new inquirer.Separator(),
            "--EXIT--"
        ]
    }
]

//Inquirer Prompts
function askManager() {
    console.log("Welcome! To create a team, please enter manager's information first.")
    inquirer.prompt(managerQs).then(answer => {
        fs.writeFile("./output/team.txt", genTeam(), function (err) {
            if (err) throw err;
        });

        answer.id = id++;
        let teamManager = new manager(answer.name, answer.id, answer.email, answer.officeNumber);
        fs.appendFile("./output/team.txt", genManager(teamManager), function (err) {
            if (err) throw err;
        });

        console.log(`${teamManager.name} successfully added as ${teamManager.role}.`);
        team.push(teamManager);
        console.log(team);
        askChoices();
    });
}

function askEngineer() {
    inquirer.prompt(engineerQs).then(answer => {
        answer.id = id++;
        let teamEngineer = new engineer(answer.name, answer.id, answer.email, answer.github);
        fs.appendFile("./output/team.txt", genEngineer(teamEngineer), function (err) {
            if (err) throw err;
        });
        
        console.log(`${teamEngineer.name} successfully added as ${teamEngineer.role}.`);
        team.push(teamEngineer);
        console.log(team);
        askChoices();
    });
}

function askIntern() {
    inquirer.prompt(internQs).then(answer => {
        answer.id = id++;
        let teamIntern = new intern(answer.name, answer.id, answer.email, answer.school);
        fs.appendFile("./output/team.txt", genIntern(teamIntern), function (err) {
            if (err) throw err;
        });

        console.log(`${teamIntern.name} successfully added as ${teamIntern.role}.`);
        team.push(teamIntern);
        console.log(team);
        askChoices();
    });
}

function askChoices() {
    inquirer.prompt(choices).then(answer => {
        console.log(answer)
        switch(answer.choice) {
            case "Engineer":
                askEngineer();
                break;
            case "Intern":
                askIntern();
                break;
            case "--EXIT--":
                fs.appendFile("./output/team.txt", genHTML(), function (err) {
                    if (err) throw err;
                })
                fs.rename("./output/team.txt", "./output/team.html", function (err) {
                    if (err) throw err;
                })
                console.log("Your team-specific HTML has been generated. Have a nice day!")
                return;
        }
    });
}

//Inquirer Validations w/ Joi
function errorCheck(err, val) {
    if(err) {
        console.log(err.message);
        return err.message;         
    } else { 
        return true;            
    }    
}

function validName(name) {
    let nameSchema = Joi.string().min(3).required();
    return Joi.validate(name, nameSchema, errorCheck);
}

function validEmail(email) {
    let emailSchema = Joi.string().email().required();
    return Joi.validate(email, emailSchema, errorCheck);
}

askManager();