var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Fiction1912",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayStore();
    
  });
  

// Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.

function displayStore() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID #: " + res[i].item_id + " Product Name: " + res[i].product_name + " Department Name: " + res[i].department_name + " Price: " + res[i].price + " Stock Quantity: " + res[i].stock_quantity);
        }
        custPrompt();
    }) 
}

function custPrompt() {
var inquirer = require('inquirer');
inquirer.prompt([{
    type: "input",
    name: "productID",
    message: "What is the ID of the product you would like to buy?"
},
{
    type: "input",
    name: "unitNum",
    message: "How many units of the product would you like to buy?"
}
]).then(function(answers) {
    checkInv(answers.productID, (answers.unitNum));
});
};

function checkInv(productID, quantity) {
    var query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
    console.log(productID);
    console.log(quantity);
    connection.query(query, [productID], function(err, res){
        // console.log(res[0].stock_quantity);
        if (res[0].stock_quantity >= parseInt(quantity)) {
            var newQuantity = res[0].stock_quantity - quantity;
            console.log(quantity * res[0].price);
            updateQuantity(productID, newQuantity)
        } else {
            console.log("Insufficient quantity");
            playAgain();
        }
    })
}

function updateQuantity(productID, newQuantity) {
    var query = "UPDATE products SET stock_quantity = ? WHERE id = ?";
    connection.query(query, [newQuantity, productID], function(err, res) {
        console.log(newQuantity);
        console.log("Stock quantity has been updated");
        playAgain();
    })
}

function playAgain() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirmChoice",
        message: "Would you like to play again"
    }
    ]).then(function(answers) {
        if (answers.confirmChoice === true) {
            custPrompt();
        } else {
            connection.end();
        }
    });
}