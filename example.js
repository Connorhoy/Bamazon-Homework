// Bamazon Code for Node application.

// Requires packages neccessary for the project. 

var inquirer = require('inquirer');
var mysql = require("mysql");

//=========================================================

// 
var connection = mysql.createConnection({
	host: "localhost",
	port: "5000",

	user: "root",
	password: "11Connor",
	database: "Bamazon"
});


inquirer.prompt([
	{	
		type: 'list',
		message: 'Welcome to Bamazon! Please select the item you would like to buy!',
		choice: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
		name: 'list'
	},
	{
		type: 'Input',
		message: 'How many would you like to buy?',
		name: 'pNumber'
	}