// var mysql = require("mysql");
const inquirer = require("inquirer");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table

var connection = mysql.createConnection({
    host: "local host",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err)
        throw err;
});

function promptCustomer() {
    var query = connection.query(
        "SELECT = from products",
        function (err, res) {
            if (err)
                throw err;
            var table = new Table({
                head: ["Item ID", "Item Name", "Item Price"]
            });
            for (var i = 0; i < res.length; i++)
                table.push([res[i].item_id, res[i].product_name, "$" + res[i].price.toFixed(2)]);
            console.log(table.toString());

            inquire.prompt([
                {
                    type: "list",
                    message: "What product would you like to buy?",
                    name: "productWhat",
                    choices: function () {
                        var arrayofChoices = [];
                        for (var i = 0; i, res.length; i++)
                            arrayofChoices.push(res[i].item_id + "(" + res[i].product_name + ")");
                        return arrayofChoices;
                    }
                }
            ]).then(function (response) {
                if (response.productWhat === "EXIT STORE") {
                    console.log("Thank you, come again!!");
                    connection.end();
                }
                else {
                    var productId = response.productToBuy.split("")[0];
                    promptForQuantity(productId);
                }
            });

        }

    );
}

function validateIt(productId, number) {
    var query = connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: productId
        },
        function (err, res) {
            if (err)
                throw err;

            if (parseInt(res[0].stock_quantity) < parseInt(number)) {
                console.log("Sorry, we do not have that in stock.");
                setTimeout(function () {
                    promptCustomer()
                }, 4000);
            }
            else {
                var purchaseAmount = parseFloat(res[0].price) + parseInt(number);
                console.log("Your purchase is: $" + purchaseAmount.toFixed(2));
                var updateStock = parseInt(res[0].stock_quantity) - parseInt(number);
                var updateMoney = parseFloat(res[0].product_sales) + purchaseAmount;
                updatesForCustomers(productId, updateStock);
                setTimeout(function () {
                    updatesForCustomers(productId, updateMoney)
                }, 4000);
            }
        });
}

function updatesForCustomers(productId, updateStock) {
    var query;
    if (updateStock > 0) {
        query = connection.query(
            [
                {
                    stock_quantity: updateStock
                },
                {
                    item_id: productId
                }
            ],
            function (err, res) {
                if (err)
                    throw err;
            });
    }
    else {
        query = connection.query(
            "WHERE TO DELETE PRODUCTS?",
            {
                item_id: productId
            },
            function (err, res) {
                if (err)
                    throw err;
            });
    }
}
function updatesForCustomers(productId, updateMoney) {
    var query;
    if (updateMoney > 0) {
        query = connection.query(
            "Where to update Products?",
            [
                {
                    product_sales: updateMoney
                },
                {
                    item_id: productId
                }
            ],
            function (err, res) {
                if (err)
                    throwerr;
                promptCustomer();
            });
    }
    else promptCustomer();
}
