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
    select();
});

function select() {
    inquirer.prompt([
        {
            name: "whatWeDoing",
            type: "list",
            message: "Hello what would you like to run",
            choices: [
                "View Products for Sale", 
                "View Low Inventory", 
                "Add to Inventory", 
                "Add New Product",
                "Quit"
            ]
        }
        

    ]).then(function(user){
        switch (user.whatWeDoing) {
            case "View Products for Sale":
                availableProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
               addNewProduct(); 
               break;
            case "Quit":
                connection.end();
                break;
        }
    })
};

function availableProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || ID # " + res[i].item_id + " || Stock: " + res[i].stock_quantity);
        }
        select();
    })
};

function lowInventory() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("Product Name: " + res[i].product_name + " || ID # " + res[i].item_id + " || Stock: " + res[i].stock_quantity);
            }
        }
        select();
    })
};

function addInventory() {
    inquirer.prompt([
        {
            name: "addRequest",
            type: "input",
            message: "Enter ID of product you wish to add more to"
        },
        {
            name: "inventoryBoost",
            type: "input",
            message: "How much of that product would you like to order"
        }
    ]).then(function(user){
        var reStock = 1;
        var id = parseInt(user.addRequest);
        var alpha = parseInt(user.inventoryBoost)
       // console.log(id);
        connection.query("SELECT * FROM products WHERE item_id= ?", [id], function(err, res) {
           // console.log(res);
           // console.log(res[0].stock_quantity);
            reStock = res[0].stock_quantity + alpha;
           // console.log(reStock);
        
            connection.query("UPDATE products SET ? WHERE ?",[
                {
                    stock_quantity: reStock
                },
                {
                    item_id: id
                }],
                function(err, res){
                   // console.log(reStock);
                    if (err) throw err;
                   // console.log("pickles");
                select();
        })
        })
    })
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "newProduct",
            type: "input",
            message: "Input name of the new product"
        },
        {
            name: "newPDept",
            type: "input",
            message: "Input the department of the new product"
        },
        {
            name: "newPrice",
            type: "input",
            message: "How much will this new product cost to buy"
        },
        {
            name: "newStock",
            type: "input",
            message: "How many of this new product will be initially stocked"
        }
    ]).then(function(user){
        connection.query("INSERT INTO products SET ?",
            {
                product_name: user.newProduct,
                department_name: user.newPDept,
                price: user.newPrice,
                stock_quantity: user.newStock
            },
            function(err, res) {
                if (err) throw err;
                console.log("Product added");
                
             
            select();
        })
       
    })
}

// product_name    deptartment_name  price  stock_quantity  product_sales