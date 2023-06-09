const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//create connection
const conn= mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password    : 'root',
    database    : 'my_db',
    port    : 3306
});

conn.connect((err) => {
    if(err){
        throw err
    }
    console.log('Connected')
});


const app = express();

// Setting up express js API
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());


// API Functions
app.post("/login", (req, res) => {
    const user = req.body;
    const query = "select * from users";
    conn.query(query, (err, result) => {
        if(err) {
            console.log('Error in Getting All');
            res.write(err);
        }
        if(Object.keys(result).length === 0) {
            
        }
        else {
            for(const users in result) {
                if(result[users]["username"] == user["username"] && result[users]["password"] == user["password"]) {
                    res.write('logged');
                    return;
                }
            }
            res.render('login 2.html');
        }
    });
});

app.post("/register", (req, res) => {
    const user = req.body;
    let query = "select * from users";
    conn.query(query, (err, result) => {
        if(err) {
            res.write(err);
        }
        if(Object.keys(result).length === 0) {
            query = "insert into users values('" + user["username"] + "', '" + user["email"] + "', '" + user["password"] + "')";
            conn.query(query, (err, result) => {
                if(err) {
                    res.write(err);
                }
                res.write('logged');
            });
        }
        else {
            for(const users in result) {
                if(result[users]["username"] == user["username"]) {
                    res.write("Username taken!");
                    return;
                }
                query = "insert into users values('" + user["username"] + "', '" + user["email"] + "', '" + user["password"] + "')";
                conn.query(query, (err, result) => {
                    if(err) {
                        res.write(err);
                    }
                    res.write('logged');
                });
            }
        }
    });
});

// App listener
app.listen(4000);