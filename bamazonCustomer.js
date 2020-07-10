var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect();

var display = function(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
    
    var table = new Table({
        head: ["ID", "Product", "Unit Cost", "Qty."],
        colWidths: [10, 25, 15],
        colAligns: ["center", "center", "right", "center"],
    });
    for(var i = 0; i < res.length; i++){
        table.push([res[i].id, res[i].products, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    console.log("");
    maintenance();
});
}

var maintenance = function(){
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Type the ID number of the item desired to buy"
    }).then(function(answer1){
        var selection = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE id=?", selection, 
        function(err, res){
            if(err) throw err;
            if(res.length === 0){
                console.log("That item does not exist. Please re-select a listed product ID.");
            }else{
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "What Quantity?"
                }).then(function(answer2){
                    var quantity = answer2.quantity;
                    if (quantity > res[0].stock_quantity){
                        console.log("There is only " 
                        + res[0].stock_quantity + " left in stock at this time.");
                        maintenance();
                    }else{
                        console.log("");
                        console.log(res[0].products + " purchased!");
                        console.log(quantity + " qty @ $" + res[0].price);

                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE ID = " + res[0].id, function(err, resUpdate){
                            if(err) throw err;
                            console.log("");
                            console.log("Your order has been processed!");
                            console.log("Thank you for using bamazon!, to select more items, please restart the service.");
                            connection.end();
                        })
                    }
                });
            }
            
        });
    });
}
display();