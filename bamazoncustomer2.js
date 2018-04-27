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

connection.connect(function (err) {
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
        .then(function (answer) {
            switch (answer.action) {
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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID #: " + res[i].item_id + " Product Name: " + res[i].product_name + " Department Name: " + res[i].department_name + " Price: " + res[i].price + " Stock Quantity: " + res[i].stock_quantity);
        }
        playAgain();
    })
}

function updateQuantity(productID, newQuantity) {
    var query = "UPDATE products SET stock_quantity = ? WHERE id = ?";
    connection.query(query, [newQuantity, productID], function (err, res) {
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
    ]).then(function (answers) {
        if (answers.confirmChoice === true) {
            askCust();
        } else {
            connection.end();
        }
    });
}

// If a manager selects Add to Inventory, your app should display a prompt 
// that will let the manager "add more" of any item currently in the store.

    //first - display items - what is the id #
    //second - give user option to select item
    //third - ask how much they want to add
    //fourth - add to inv and console.log("You added these items to the stock quantity")

    function displayStore() {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("ID #: " + res[i].item_id + " Product Name: " + res[i].product_name + " Department Name: " + res[i].department_name + " Price: " + res[i].price + " Stock Quantity: " + res[i].stock_quantity);
            }
        }) 
    }

function addToInv() {
    inquirer.prompt([{
        type: "input",
        name: "productID",
        message: "What is the ID of the product you would like to add to?"
    },
    {
        type: "input",
        name: "unitNum",
        message: "How many units of the product would you like to add?"
    }
    ]).then(function(answers) {
        console.log("hello")
        // checkInv(answers.productID, (answers.unitNum));
    });
}


function addFromId(productID, addUnits) {

}

function lowInventory() {
    console.log("hi")
}




function addNewProduct() {
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
    ]).then(function (answers) {
        connection.query(
            "INSERT INTO products SET ?",{
            product_name: answers.addProduct,
            department_name: answers.addCategory,
            price: answers.addPrice,
            stock_quantity: answers.addQuantity
        },
            function (err) {
                if (err) throw err
                console.log("Adding product...");
                askCust();
            }
        )
    });
};
