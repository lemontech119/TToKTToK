const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

router.get('/logout', (req, res) => {
    console.log('로그아웃시도1');
    console.log(req.session.user);
    req.session.destroy(function () {
        req.session;
    });
    console.log('로그아웃시도2');
    res.redirect('/');
})

// 로그인 창
router.get("/login", (req, res) =>{
    res.render("member/login.ejs");
})

router.post("/login", (req, res) =>{
    let user_id = req.body.userid;
    let password = req.body.password;
    let sql = "select * from ttokttok.member where member_id = ?";
    connection.query(sql, [user_id], function(err, rows){
        if(!err){
            console.log(rows);
            if(rows.length == 0){
                console.log("ID 잘못 적은 케이스");
                res.render("member/login.ejs");
                return;
            }else if(password != rows[0].password){
                console.log("ID는 맞았지만 비밀번호가 다름");
                res.render("member/login.ejs");
                return;
            }else{
                console.log("성공이당");
                req.session.user = user_id;
                req.session.save(function(){
                    res.redirect("/");
                })
                return;
            }
            
            
            console.log("이거 나오면 안되는데...");
        }else{
            console.log(err);
            res.send(err);
        }
    })    
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
