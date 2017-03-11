// Bamazon Code for Node application.
// Most code taken from Austin I, worked in Tandem with him on this one.

var mysql = require("mysql");
var inquirer = require("inquirer");

//Setting link to database.
var connection = mysql.createConnection({
	host: "localhost",
	post: "3306",

	user: "root",
	password: "11connor",
	database: "Bamazon" 
});

// Runs the program.
var run = function(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		res.forEach(function(x){
			console.log(x.item_id + ". " + x.product_name);
		});
	});
};

// Timer to make the logged response clean.

setTimeout(function(){

	// User shopping order.
	inquirer.prompt([
	{
		type: "list",
		message: "Welcome to Bamazon! Please select the item you would like to buy!",
		choices: ["1","2","3","4","5","6","7","8","9","10","11"],
		name: "options"
	},
	{
		type: "input",
		message: "How many would you like to buy?",
		name: "pNumber"
	}

	// What to do with user information.
	]).then(function(user){
		connection.query("SELECT * FROM products WHERE item_id =" + user.options, function(err,res){
			res.forEach(function(x){
				console.log("You are buying: " + x.product_name + ".");
				console.log("You are buying " + user.pNumber + " of this product.")
			})
		})
			// Timer to make the logged response clean.
			setTimeout(function(){
			// Asks the user if they entered the correct order.
			inquirer.prompt([
			{
				type: "confirm",
				message: "Is this correct?",
				name: "confirm"
			}
			]).then(function(y){
				if( user.confirm === true){
					// Message to tell the user the code is running
					console.log("Processing your order...");
					// Calling database to get the needed information
					connection.query("SELECT stock_quantity FROM products WHERE item_id=" + user.options, function(err,res){
						//Setting a timer so the UI looks nice.
						setTimeout(function(){	
							// Setting var for returned data
							var oldStock = res[0].stock_quantity;
							// Var to calculate new stock after purchase 
							var newStock = Math.abs(oldStock - user.pNumber);
							// Will not allow user to buy above the in stock number
							if(user.pNumber < oldStock){
								// Timeout for UI
								setTimeout(function(){
									// Calling to database to get needed information 
									connection.query("UPDATE products SET ? WHERE ?", [{
										stock_quantity: newStock
									},	{
										item_id: user.options

									}],function(err,res){
									});


									// UI to show that the process has been completed
									console.log("Your order has been placed!")
								}, 500);

								// Calling to database to get needed data
								connection.query("SELECT price FROM products WHERE item_id="+ user.options, function(err,res){
									
									// Sets variable for the returned data
									var price = res[0].price
									// Sets variable for needed calculations 
									var total = Math.abs(price * user.pNumber)
									// Tells the user their total cost
									console.log("Your total price comes to $"+ total + ".")
									// THANKS FOR THE MONEY CHUMP (lol)
									console.log("Thanks for shopping with Bamazon!")
								})
								// Ends connection to database
								connection.end();
							// If requested amount is not in stock, will cancel order
						}

						else {
							console.log("Sorry, we do not have that item in the quantity that you ordered. Please try again.")
						}
					})
					})
				// If user places incorrect order
			}

			else{
				console.log("Thank you for visiting Bamazon.")
				connection.end();
			}
		})

		}, 500);

		})

}, 1000);


run();