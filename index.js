// CLASSES 
const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const Intern = require('./lib/Intern.js')
const fs = require('fs')

// PAGES 
const generateTemplate = require('./src/generateTemplate.js')
const inquirer = require('inquirer')

// REGULAR EXPRESSIONS 
const regName = /^[a-zA-Z]+([a-zA-Z ,.'-]+)?([a-z]+$)/
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const regId = /^[0-9]+$/
const regGitHubUsername = /^[a-z]+[a-z-][a-z]+$/i

// DATA NEEDED FOR PAGE 
let dataArr = []

const getTeamMembers = async () => {
    await inquirer.prompt([
        {
            // asks for adding intern, engineer or finish project 
            type: 'list',
            name: 'addMember',
            message: 'Which type of team member would you like to add? (required!)',
            choices: ['Engineer', 'Intern', "I'm done adding Team members!"]
        }
    ])
    .then(answer => {
        const {addMember} = answer 
        if (addMember === 'Engineer') {
            getEngineerInfo()
        } else if (addMember === 'Intern') {
            getInternInfo()
        } else {
            let template = generateTemplate(dataArr)
            fs.writeFile('./dist/index.html', template, err => {
                if (err) throw err;
                console.log(`
                Your team has been created!
                `)
            })
        }

})
}


const getManagerInfo = async () => {
    console.log(`
    =====================================
    Please Fill in Manager's Information:
    =====================================
    `)
    // asks for manager's name, id email and office number 
    await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name? (required!)",
        validate: managerName =>  {
            if (regName.test(managerName)) {
                return true
            } else {
                console.log(`\nPlease Enter a Valid Name!\n`)
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'Id',
        message: `What is the manager's Id Number? (required!)`,
        validate: managerId =>  {
            if (regId.test(managerId)) {
                return true
            } else {
                console.log(`\nPlease Enter a Valid Number!\n`)
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the manager's Email? (required!)",
        validate: managerEmail =>  {
            if (regEmail.test(managerEmail)) {
                return true
            } else {
                console.log(`\nPlease Enter a Valid Email!\n`)
                return false
            }
        }
    },
    {
        type: "input",
        name: 'officeNumber',
        message: "What is the team manager's office number? (required!)",
        validate: managerOfficeNumber =>  {
            if (regId.test(managerOfficeNumber)) {
                return true
            } else {
                console.log(`\nPlease Enter a Valid Email!`)
                return false
            }
        }
    }
])
.then(answers => {
    const {name, Id, email, officeNumber} = answers
    const manager = new Manager(name, Id, email, officeNumber)
    dataArr.push(manager)
    getTeamMembers()
})

}

// prompts get Engineer name, email, github and id 
const getEngineerInfo = async ()  => {
    console.log(`
    ======================================
    Please Fill in Engineer's Information:
    ======================================
    `)
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your Engineer's name? (required!)",
            validate: engineerName => {
                if (regName.test(engineerName)) {
                    return true
                } else {
                console.log(`\nPlease Enter a Valid Name!\n`)
                    return false
                }
            }
        },
        {
            type: "input",
            name: 'Id',
            message: "What is your Engineer's Id Number? (required!)",
            validate: engineerId => {
                if (regId.test(engineerId)) {
                    return true
                } else {
                console.log(`\nPlease Enter a Valid Number!\n`)
                    return false
                }
            }
        },
        {
            type: "input",
            name: 'email',
            message: "What is your Engineer's Email? (required!)",
            validate: engineerEmail => {
                if (regEmail.test(engineerEmail)) {
                    return true
                } else {
                console.log(`\nPlease Enter a Valid Email!\n`)
                    return false
                }
            }
        },
        {
            type: "input",
            name: 'gitHub',
            message: "What is your Engineer's Github username? (required!)",
            validate: engineerGitHub => {
                if (regGitHubUsername.test(engineerGitHub)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(answers => {
        const {name, Id, email, gitHub} = answers
        const engineer =  new Engineer(name, Id, email, gitHub)
        dataArr.push(engineer)
        getTeamMembers()
    })
}

// prompts get's intern's name , email, id and school name 
const getInternInfo = async () => {
    console.log(`
    ====================================
    Please Fill in Inters's Information:
    ====================================
    `)
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your intern's name? (required!)",
            validate: internName => {
                if (regName.test(internName)) {
                    return true
                } else {
                console.log(`\nPlease Enter a Valid Name!\n`)
                    return false
                }
            }
        },
        {
            type: "input",
            name: 'Id',
            message: "What is your intern's Id Number? (required!)",
            validate: internId =>  {
                if (regId.test(internId)) {
                    return true
                } else {
                    console.log(`\nPlease Enter a Valid Number!\n`)
                    return false
                }
            }
        },
        {
            type: "input",
            name: 'email',
            message: "What is your intern's Email? (required!)",
            validate: internEmail => {
                if (regEmail.test(internEmail)) {
                    return true
                } else {
                console.log(`\nPlease Enter a Valid Email!\n`)
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'schoolName',
            message: "What is your intern's school name? (required!)",
            validate: schoolName => {
                if (regName.test(schoolName)) {
                    return true
                } else {
                console.log(`\nPlease Enter a Valid School Name!\n`)
                    return false
                }
            }
        }
    ])
    .then(answers => {
        const {name, Id, email, schoolName} = answers
        const intern =  new Intern(name, Id, email, schoolName)
        dataArr.push(intern)
        getTeamMembers()
    })
}


getManagerInfo()
