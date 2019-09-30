const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

router.get("/", (req, res) => {
    
    res.render("test.ejs");
})

router.get("/dbtest", (req, res) => {
    
    connection.query("select * from ttokttok.member", function(err, rows, fields){
        // connection.end();
        if(!err){
            console.log(rows);
            
            res.send(rows);
        }else{
            console.log("query error : " + err);
            res.send(err);
        }
    })
})


module.exports = router;
