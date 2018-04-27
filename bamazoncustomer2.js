var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Fiction1912",
    database: "bamazon2_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askCust();
    
  });
  
function askCust() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View products for sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add new product"
      ]
    })
    .then(function(answer) {
        switch(answer.action) {
        case "View products for sale":
        displayStore();
        break;

        case "View Low Inventory":
        lowInventory();
        break;

        case "Add to Inventory":
        addToInv();
        break;

        case "Add new product":
        addNewProduct();
        break;
        }
    });
}

function displayStore() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID #: " + res[i].item_id + " Product Name: " + res[i].product_name + " Department Name: " + res[i].department_name + " Price: " + res[i].price + " Stock Quantity: " + res[i].stock_quantity);
        }
        playAgain();
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
        message: "Would you like to choose again"
    }
    ]).then(function(answers) {
        if (answers.confirmChoice === true) {
            askCust();
        } else {
            connection.end();
        }
    });
}

// If a manager selects Add to Inventory, your app should display a prompt 
// that will let the manager "add more" of any item currently in the store.

function lowInventory() {
    console.log("hi")
}

function addToInv(){
console.log("hi")
}

// function addInvAgain() {

// }

function addNewProduct(){
    inquirer.prompt([{
        type: "input",
        name: "addProduct",
        message: "What product would you like to add?"
    },
    {
        type: "input",
        name: "addCategory",
        message: "What category should this go in?"
    },
    {
        type: "input",
        name: "addPrice",
        message: "How much does it cost?"
    },
    {
        type: "input",
        name: "addQuantity",
        message: "How many units do you want to add?"
    }
]).then(function(answers){
    connection.query({
        "INSERT INTO products SET ?",
        product_name: answers.addProduct,
        department_name: answers.category,
        price: answer.addPrice,
        stock_quantity: answer.addQuantity
    }


    )
      
        });
    };

      // var product =  answers.addProduct;  
        // var category = answers.addCategory;
        // var price = answers.addPrice;
        // var quantity = answers.addQuantity;
        // // var query = "INSERT INTO products SET product_name = ? department_name = ? price = ? stock_quantity = ? WHERE item_id = 11"
        // // console.log(query);
        // // connection.query(query, [product, category, price, quantity], function(err, res){
        // //     if (err) throw err;
        // //     console.log(res);
        // //     }); 

        // var query = "INSERT INTO products"


    // connection.query(
    //     "INSERT INTO auctions SET ?",
    //     {
    //       item_name: answer.item,
    //       category: answer.category,
    //       starting_bid: answer.startingBid,
    //       highest_bid: answer.startingBid
    //     },
    //     function(err) {
    //       if (err) throw err;
    //       console.log("Your auction was created successfully!");
    //       // re-prompt the user for if they want to bid or post
    //       start();
    //     }
    //   );
    // });


// function updateQuantity(productID, newQuantity) {
//     var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
//     connection.query(query, [newQuantity, productID], function(err, res) {
//         console.log("Stock quantity has been updated");
//         playAgain();
//     })
// }

// function addNewAgain() {
    
// }