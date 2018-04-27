var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

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
        custPrompt();
        // askCust();
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
        console.log("Product ID: " + productID);
        console.log("Quantity: " + quantity);
        connection.query(query, [productID], function(err, res){
            // console.log(res[0].stock_quantity);
            if (res[0].stock_quantity >= parseInt(quantity)) {
                var newQuantity = res[0].stock_quantity - quantity;
                console.log("New quantity: " + newQuantity);
                var price = quantity * res[0].price;
                console.log("Total Price: " + price);
                updateQuantity(productID, newQuantity);
        
            } else {
                console.log("Insufficient quantity");
                askCust();
            }
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


function addToInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID #: " + res[i].item_id + " Product Name: " + res[i].product_name + " Department Name: " + res[i].department_name + " Price: " + res[i].price + " Stock Quantity: " + res[i].stock_quantity);
        }
        inquirer.prompt([{
            type: "input",
            name: "productID",
            message: "What is the ID of the product you would like to add to?"
        },
        {
            type: "input",
            name: "currentNum",
            message: "How many units of the product are there currently in the database?"
        },
        {
            type: "input",
            name: "unitNum",
            message: "How many units of the product would you like to add?"
        }

        ]).then(function (answers) {
            var currentQuan = parseInt(answers.currentNum);
            var addQuan = parseInt(answers.unitNum);
            var newQuantity = currentQuan + addQuan;
            connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: newQuantity
                },
                {
                    item_id: answers.productID
                }], function (err) {
                    if (err) throw err;
                    console.log("Item added to inventory...")
                    playAgain();
                }
            )
        });
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("This/these item(s) are low on inventory " + "Product name: " + res[i].product_name +  " Stock Quantity: " + res[i].stock_quantity);
            askCust();
        }    
    });
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
            "INSERT INTO products SET ?", {
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
