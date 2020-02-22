const inquirer = require('inquirer');
const fs = require("fs");
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const {
    defineEmployee, 
    employeeQuestions, 
    managerQuestions, 
    engineerQuestions, 
    internQuestions
} = require('./inquire');

let employeesHTML = "";

function init() {
    inquirer
    .prompt(employeeQuestions.concat(managerQuestions))
    .then(({name, id, email, officeNumber}) => {
        const manager = new Manager(name, id, email, officeNumber);
        fs.readFile("./templates/manager.html", "utf8", (err, data) => {
            if (err) throw err;
            const templateData = data
                .replace("{{name}}", manager.name)
                .replace("{{id}}", manager.id)
                .replace("{{email}}", manager.email)
                .replace("{{officeNumber}}", manager.officeNumber);
            employeesHTML += templateData;
            getEmployee();
        })
    })
}

function getEmployee() {
    inquirer
    .prompt(defineEmployee)
    .then(({userChoice}) => {
        switch (userChoice) {
            case 'Engineer':
                getEngineer();
                break;
            case 'Intern':
                getIntern();
                break;
            case 'Complete':
                renderHtml(employeesHTML);
                break;
            default:
                renderHtml(employeesHTML);
                break;
        }
    })
}

function getEngineer() {
    inquirer
    .prompt(employeeQuestions.concat(engineerQuestions))
    .then(({name, id, email, githubUsername}) => {
        const engineer = new Engineer(name, id, email, githubUsername);
        fs.readFile("./templates/engineer.html", "utf8", (err, data) => {
            if (err) throw err;
            const templateData = data
                .replace("{{name}}", engineer.name)
                .replace("{{id}}", engineer.id)
                .replace("{{email}}", engineer.email)
                .replace("{{github}}", engineer.github);
            employeesHTML += templateData;
            getEmployee();
        })
    })
}

function getIntern() {
    inquirer
    .prompt(employeeQuestions.concat(internQuestions))
    .then(({name, id, email, school}) => {
        const intern = new Intern(name, id, email, school);
        fs.readFile("./templates/intern.html", "utf8", (err, data) => {
            if (err) throw err;
            const templateData = data
                .replace("{{name}}", intern.name)
                .replace("{{id}}", intern.id)
                .replace("{{email}}", intern.email)
                .replace("{{school}}", intern.school);
            employeesHTML += templateData;
            getEmployee();
        })
    })
}

function renderHtml() {
    fs.readFile("./templates/main.html", "utf8", (err, data) => {
        if (err) throw err;        
        const mainHtml = data.replace("{{main}}", employeesHTML);
        fs.writeFile("./output/team.html", mainHtml, function (err) {
            if (err) throw err;
        });
    });
}

init();