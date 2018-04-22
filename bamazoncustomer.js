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
    checkInv(answers.productID, parseInt(answers.unitNum));
});
};

function checkInv(productID, quantity) {
    var query = "SELECT stock_quantity, price FROM products WHERE id = ?";
    connection.query(query, [productID], function(err, res){
        if (res[0].stock_quanity >= parseInt(quantity)) {
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

// Once the customer has placed the order, your application should check if your store has 
// enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.