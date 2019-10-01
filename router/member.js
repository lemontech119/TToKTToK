const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

router.get("/", (req, res) => {
    
    res.render("test.ejs");
})


// 로그인 창
router.get("/login", (req, res) =>{
    res.render("member/login.ejs");
})



// 회원가입 창
router.get("/join", (req, res) =>{
    res.render("member/join.ejs");
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
