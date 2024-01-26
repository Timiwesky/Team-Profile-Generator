// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }

    // method to get the employee's name
    getName() {
      return this.name;
    }

    // method to get the employee's ID
    getId() {
      return this.id;
    }

    // method to get the employee's E-mail
    getEmail() {
      return this.email;
    }

    // method to get the employee's role
    getRole() {
      return "Employee";
    }
  };
  
  module.exports = Employee;