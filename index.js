const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Array to store team members
const teamMembers = [];

// Function to gather information about the manager
function createManager() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the manager's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the manager's email:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number:",
    },
  ]).then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    // Call a function to display the menu and continue gathering information
    displayMenu();
  });
}


// Function to gather information about an engineer
function createEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's email:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
      },
    ]).then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      teamMembers.push(engineer);
      displayMenu();
    });
  }
  
  // Function to gather information about an intern
  function createIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the intern's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's email:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
      },
    ]).then((answers) => {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(intern);
      displayMenu();
    });
  }
  
  // Function to display the menu and handle user choices
  function displayMenu() {
    inquirer.prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: ["Add an engineer", "Add an intern", "Finish building the team"],
      },
    ]).then((answers) => {
      if (answers.menuChoice === "Add an engineer") {
        createEngineer();
      } else if (answers.menuChoice === "Add an intern") {
        createIntern();
      } else {
        // User chose to finish building the team
        generateHTML();
      }
    });
  }
  
  // Ensure the output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  
  // Function to generate HTML and write it to the output file
  function generateHTML() {
    const html = render(teamMembers);
    fs.writeFileSync(outputPath, html);
    console.log(`Team HTML generated at ${outputPath}`);
  }
  
  // Start the application by creating the manager
  createManager();