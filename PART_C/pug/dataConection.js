var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');


const CreateUsers = (req,res,next)=> {
    var QQ1 = "CREATE TABLE users (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL, Cpassword varchar(255) NOT NULL)"
    
    console.log("users table creation");
    SQL.query(QQ1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created users table');
        next();
    })      
};



const CreateRecipes = (req,res,next)=> {
    var QQ2 = "CREATE TABLE recipes (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, RecipeName varchar(255) NOT NULL, category varchar(30) NOT NULL,paragraph_text varchar(500) NOT NULL)"
    
    console.log("Recipes table creation");
    SQL.query(QQ2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created Recipes table');
        next();
    })      
};


const InsertDataToUsers = (req,res,next)=>{
    var QQ3 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "name": element.name,
            "email": element.email,
            "password": element.password,
            "Cpassword": element.Cpassword
        }
        SQL.query(QQ3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
    next();
};

const InsertDataToRecipes = (req,res,next)=>{
    var QQ4 = "INSERT INTO recipes SET ?";
    const csvFilePath= path.join(__dirname, "recipes.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "RecipeName" : element.RecipeName,
            "category" : element.category,
            "paragraph_text" : element.paragraph_text
            
        }
        SQL.query(QQ4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
    next();
};



const ShowUsersTable = (req,res,next)=>{
    var QQ6 = "SELECT * FROM users";
    SQL.query(QQ6, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table users", err);
            res.send("error in showing table users");
            return;
        }
        console.log("showing users table");
        next();
    })};

    const ShowRecipesTable = (req,res,next)=>{
        var QQ5 = "SELECT * FROM recipes";
        SQL.query(QQ5, (err, mySQLres)=>{
            if (err) {
                console.log("error in showing table recipes", err);
                res.send("error in showing table recipes");
                return;
            }
            console.log("showing recipes table");
            next();
        })};
    

const DropUsersTable = (req, res, next)=>{
    var QQ7 = "DROP TABLE users";
    SQL.query(QQ7, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table users", err);
            res.status(400).send({message: "error om dropping table users" + err});
            return;
        }
        console.log("users table drpped");
        next();
    })
};

const DropRecipessTable = (req, res, next)=>{
    var QQ8 = "DROP TABLE recipes";
    SQL.query(QQ8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table recipes ", err);
            res.status(400).send({message: "error om dropping table recipes" + err});
            return;
        }
        console.log("recipes table drpped");
        next();
    })
}

module.exports = {
    CreateUsers,
    CreateRecipes,
    InsertDataToUsers,
    InsertDataToRecipes,
    ShowUsersTable,
    ShowRecipesTable,
    DropUsersTable,
    DropRecipessTable
 };