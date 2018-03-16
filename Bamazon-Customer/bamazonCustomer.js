var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "",

    database: "bamazondb"
});

connection.connect(function(err) {
    if (err) throw err;
    
});

connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    for (var i=0; i<res.length; i++) {
        console.log("Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || ID # " + res[i].item_id);
    }
    select();
})

function select() {
    inquirer.prompt([
        {
            name: "itemWanted",
            type: "input",
            message: "Enter the ID number of the item you want"
        },
        {
            name: "howMany",
            type: "input",
            message: "How many of that item would you like"
        }
        

    ]).then(function(user){
        connection.query("SELECT * FROM products WHERE item_id=?", [user.itemWanted], function(err, res) {
            console.log(res[0].stock_quantity);
            if (res[0].stock_quantity >= user.howMany) {
                var cost = res[0].price * user.howMany;
                var quantity = res[0].stock_quantity - user.howMany;
                var profit = res[0].product_sales + cost;
                connection.query("UPDATE products SET ? WHERE ?",[
                    {
                        stock_quantity: quantity
                    },
                    {
                        item_id: user.itemWanted
                    }
                ], function(err, res) {
                    if (err) throw err;
                
                // connection.query("UPDATE products SET ? WHERE ?",[
                //     {
                //         product_sales: profit
                //     },
                //     {
                //         item_id: user.itemWanted
                //     }
                // ], function(err, res) {
                //     if (err) throw err;
                // });
            });
                console.log("The total for your purchase is: " + cost);
                
            }
            else {
                console.log ("Insufficient Stock, Apologies for the inconvience");
            }
        })
    });
}