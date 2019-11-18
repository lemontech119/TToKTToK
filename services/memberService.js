const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);


const myPage = (req, res)=>{
    let user = req.session.user;
    let sql ="select * from ttokttok.reservation where idx_member=?";
    connection.query(sql, [user], function(err, rows){
        if(!err){
            console.log("The solution is ", rows);
            res.render("member/mypage.ejs", {
                mypage: rows,
                result: "normal"
            })
        }else{
            res.send("에러 발생")
        }
    })
}

const createMember = (req, res) => {
    let user_id = req.body.userid;
    let password = req.body.password;
    let name = req.body.name;
    let sql = "insert into ttokttok.member(member_id, password, name) values (?, ?, ?)";

    connection.query(sql, [user_id, password, name], function(err, rows){
        if(!err){
            console.log("The solution is ", rows);
            res.redirect("/");
        }else{
            res.send("실패 ㅠㅠ");
        }
    })
}

const logoutMember = (req, res) =>{
    console.log('로그아웃시도1');
    console.log(req.session.user);
    req.session.destroy(function () {
        req.session;
    });
    console.log('로그아웃시도2');
    res.redirect('/');
}

const loginMember = (req, res) =>{
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
            
        }else{
            console.log(err);
            res.send(err);
        }
    })
}

module.exports = {
    myPage,
    loginMember,
    createMember,
    logoutMember
}