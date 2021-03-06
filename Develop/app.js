const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeequestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID number."
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the employee's email address."
    },
    {
        type: "list",
        name: "position",
        message: "What is the employee's position",
        choices: ["Manager", "Engineer", "Intern"]
    },
]

function start() {
    inquirer.prompt(employeequestions).then(function(data){
        if(data.position === "Manager"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is the office number?"
                }
            ]).then(function(managerData){
                const newManager = new Manager(data.name,data.id,data.email,managerData.officeNumber)
                employees.push(newManager)
                inquirer.prompt({
                    type: "list",
                    name: "yesno",
                    choices: ["YES", "NO"],
                    message: "Would you like to add more employees?"
                }).then(function(response){
                    if(response.yesno === "YES"){
                    start()
                    }else{
                    createTeam()
                    }
                })
            })
        }
        if(data.position === "Engineer"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "github",
                    message: "Please enter the engineer's github user name."
                }
            ]).then(function(engineerData){
                const newEngineer = new Engineer(data.name,data.id,data.email,engineerData.github)
                employees.push(newEngineer)
                inquirer.prompt({
                    type: "list",
                    name: "yesno",
                    choices: ["YES", "NO"],
                    message: "Would you like to add more employees?"
                }).then(function(response){
                    if(response.yesno === "YES"){
                        start()
                    }else{
                        createTeam()
                    }
                })
            })
        }
        if(data.position === "Intern"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Please enter the name of the intern's school."
                }
            ]).then(function(internData){
                const newIntern = new Intern(data.name,data.id,data.email,internData.school)
                employees.push(newIntern)
                inquirer.prompt({
                    type: "list",
                    name: "yesno",
                    choices: ["YES", "NO"],
                    message: "Would you like to add more employees?"
                }).then(function(response){
                    if(response.yesno === "YES"){
                        start()
                    }else{
                        createTeam()
                    }
                })
            })
        }
    })
}
function createTeam() {
    const html = render(employees)
    fs.writeFile(outputPath,html,function(){
        console.log("Success!")
    })
}

start()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
