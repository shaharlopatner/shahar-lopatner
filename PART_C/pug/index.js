// import:
const express= require('express');
const path= require('path');
const app= express();
const port= 3030;
const bodyParser = require("body-parser");
const sql = require("./db");
const CRUD= require('./CRUD');
const DBCreation = require('./dataConection');
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const start =function(req,res){
    res.render('index');
}

//setup:
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(bodyParser.json());// parse requests of contenttype: application/json
app.use(bodyParser.urlencoded({ extended: true}));
app.get('/', [DBCreation.DropUsersTable, DBCreation.DropRecipessTable, DBCreation.CreateUsers, DBCreation.CreateRecipes, DBCreation.InsertDataToUsers, DBCreation.InsertDataToRecipes, start]);

//route:
app.get('/home',(req,res)=>{
    res.render('index');
});

app.get('/register', (req, res)=>{
    res.render('register');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/upload', (req, res)=>{
    res.render('upload');
});
app.get('/Searchbycategory',CRUD.SearchByCategory);
app.get("/Searchbyingredients", CRUD.SearchByIngredients);
app.post('/CreateNewUser',CRUD.InsertUser);
app.post('/InsertNewRecipe',CRUD.InsertRecipe);
app.post('/findUser',CRUD.findUser);
//server:
app.listen(port,()=>{
    console.log("running in port"+port);
})
