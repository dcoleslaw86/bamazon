var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect((err) => {
    if (err) throw err;
    listProducts();
  })
  
  function listProducts() {
    console.log("Listing all available products...\n");
  
    connection.query("SELECT * FROM products",
    (err, res) => {
      if (err) throw err;
      
      var idList = [];
  
      for (let i = 0; i < res.length; i++) {
        console.log("Id: " + res[i].item_id);
        console.log("Product Name: " + res[i].product_name);
        console.log("Department: " + res[i].department_name);
        console.log("Price: $" + res[i].price);
        console.log("# in Stock: " + res[i].stock_quantity);
        console.log("-----------------------");
        idList.push(res[i].item_id);
      }
      userPrompt(res, idList);
    });
  }
  
  function userPrompt(results, idList) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'desired',
          message: 'Select the Id of the product you want to buy:',
          choices: idList
        },
        {
          name: 'amount',
          message: 'How many would you like to buy?'
        }
      ])
      .then(answers => {
        if (stockValidator(results, answers.desired, answers.amount)) {
          var newAmount, price;
          for (let i = 0; i < results.length; i++) {
            if (results[i].item_id === answers.desired){
              newAmount = results[i].stock_quantity - answers.amount
              price = results[i].price
            }
          }
          connection.query(
            "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
            [newAmount, answers.desired],
            (err, res) => {
              if (err) throw err;
              console.log("Your total cost is: $" + answers.amount * price + "\n");
              restart();
            }
          )
        }
        else {
          userPrompt(results, idList);
        }
      })
  }
  
  function stockValidator(itemList, desiredId, desiredAmount) {
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].item_id === desiredId && itemList[i].stock_quantity >= desiredAmount) {
        return true;
      }
    }
  
    console.log("Insufficient quantity!\n");
    return false;
  }
  
  function restart() {
    inquirer
      .prompt(
        {
          type: 'confirm',
          message: 'Would you like to continue shopping?',
          name: 'continue'
        }
      )
      .then(answer => {
        if (answer.continue) {
          listProducts();
        }
        else {
          connection.end();
        }
      })
  }

