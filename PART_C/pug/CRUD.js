const sql = require('./db');


const InsertUser = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const NewUserEntry = {
        "name" : req.body.UserName,
        "email" : req.body.UserMail,
        "password": req.body.password,
        "Cpassword": req.body.Cpassword
    }
    const Q1 = "INSERT INTO users SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error in creating user " + err});
            console.log({message: "error in creating user " + err});
            return;            
        }
        console.log("created new user succesfully "+ mysqlres);
        res.render('success', {
            var1: "http://localhost:3030/login",
            var2: "Hi!",
            var3: "You have successfully joined our community!",
            var4: 'Login with your user!'
        });
        //res.send({message:"created new user succesfully "+ mysqlres});
        return;
    });
};



const InsertRecipe = (req,res)=>{
        if (!req.body) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return;
        }
        const NewRecipeEntry = {
            "RecipeName" : req.body.RecipeName,
            "category" : req.body.category,
            "paragraph_text": req.body.paragraph_text
            
        }
        const Q2 = "INSERT INTO recipes SET ?";
        sql.query(Q2, NewRecipeEntry, (err, mysqlres)=>{
            if (err) {
                res.status(400).send({message: "error in creating Recipe " + err});
                console.log({message: "error in creating Recipe " + err});
                return;            
            }
            console.log("created new Recipe succesfully "+ mysqlres);
             res.render('success', {
                 var1: 'http://localhost:3030/home',
                 var2: "Your recipe has been successfully added! " + mysqlres.name,
                 var3:"Thank you.",
                 var4:'Go Back To Home Page!'
            });
           // res.send({message:"created new Recipe succesfully "+ mysqlres});
            return;
        });
    };

    const findUser = (req, res)=>{
            if (!req.body) {
                res.status(400).send({message: "Content can not be empty!"});
                return;        
            }
            
            var User = req.body.user_Email;
            var password=req.body.user_password;
        
            console.log(User );
            sql.query("SELECT * FROM users where (email =? AND password =?)" , [User,password] , (err, results, fields)=>{
                if (err) {
                    console.log("ERROR IS: " + err);
                    res.status(400).send("Somthing is wrong with query" + err);
                    return;
                }
                if(results.length ==0){
                    res.status(400).render('success', {
                        var1: 'http://localhost:3030/login',
                        var2: "No user was found according to your data",
                        var3:"Please try again",
                        var4:'Go Back To login Page!'
                   });
                   return;
                   
                }
                console.log("User found");
                // res.send(results);
                res.render("Upload");
                return;
            } )
     };

     const SearchByIngredients = (req, res) => {
       
        if (!req.body) {
            res.status(400).send({ message: "content can not be empty" });
            return;
        }
        
        var Ingredient = req.query.search_input;
      
        console.log(Ingredient);
       
    
        const Q3 = "SELECT * FROM recipes where paragraph_text like '%" + Ingredient + "%'";
        console.log(Q3);
        sql.query(Q3, (err, mysqlressearch) => {
            if (mysqlressearch==0) {
                res.status(400).render('success', {
                    var1: 'http://localhost:3030/home',
                    var2: "No recipes were found according to your ingredients",
                    var3:"Please try others",
                    var4:'Go Back To HOME Page!'
               });
               return;
            }
            // if not query error
            console.log("finding recipes");
            res.render('results', {
                var1: "Recipes especially for your request",
                pple: mysqlressearch
            });
            return;
        });
    };
    const SearchByCategory = (req, res) => {
       
        if (!req.body) {
            res.status(400).send({ message: "content can not be empty" });
            return;
        }
        
        var category = req.query.category;
      
        console.log(category);
       
    
        const Q4 = "SELECT * FROM recipes where category like '%" + category + "%'";
        console.log(Q4);
        sql.query(Q4, (err, mysqlrescategory) => {
            if (err) {
                console.log("error is: " + err);
                res.status(400).send({ message: "error in finding recipes " + err });
                return;
            }
            // if not query error
            console.log("finding recipes");
            res.render('results', {
                var1: "Recipes especially for your request",
                pple: mysqlrescategory
            });
            return;
        });
    };

   

module.exports = {InsertUser,InsertRecipe,findUser,SearchByIngredients,SearchByCategory}