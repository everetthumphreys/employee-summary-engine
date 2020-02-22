const inquire = {
    defineEmployee: [
        {
            type: 'list',
            message: 'Enter employee type:',
            name: 'userChoice',
            choices: ['Engineer', 'Intern', 'Complete']
        }
    ],
    employeeQuestions: [
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: 'input',
            message: 'Please enter your employee ID number:',
            name: 'id',
        },
        {
            type: 'input',
            message: 'Please enter a valid email:',
            name: 'email',
        }

    ],
    managerQuestions: [
        {
            type: 'input',
            message: 'Office Number',
            name: 'officeNumber',
        }
    ],

    engineerQuestions: [
        {
            type: 'input',
            message: 'GitHub Username',
            name: 'githubUsername'
        }
    ],

    internQuestions: [
        {
            type: 'input',
            message: 'School',
            name: 'school'
        }
    ]
};

module.exports = inquire;