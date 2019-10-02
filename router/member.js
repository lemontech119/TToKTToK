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

router.post("/login", (req, res) =>{
    let user_id = req.body.userid;
    let password = req.body.password;
    

    console.log("user_id " + user_id);
    console.log("password " + password);
    

    res.send("post test");
})



// 회원가입 창
router.get("/join", (req, res) =>{
    res.render("member/join.ejs");
})

router.post("/join", (req, res) =>{
    let user_id = req.body.userid;
    let password = req.body.password;
    let name = req.body.name;
    let sql = "insert into ttokttok.member(member_id, password, name) values (?, ?, ?)";

    connection.query(sql, [user_id, password, name], function(err, rows){
        if(!err){
            console.log("The solution is ", rows);
            res.send("성공!");
        }else{
            res.send("실패 ㅠㅠ");
        }
    })

    
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
