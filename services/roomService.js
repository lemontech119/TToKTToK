const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

const deleteRoom = (req, res)=>{
    let id = req.params.id;

    let sql = "delete from ttokttok.reservation where id=?";
    console.log("id", id)
    connection.query(sql, id, function(err, rows){
        if(!err){
            console.log(rows);
            res.redirect("/member/mypage");
        }else{
            console.log(err);
            res.send("에러...")
        }
    })
}

const readRooms = (req, res) =>{
    let sql = "select * from ttokttok.cenference";

    connection.query(sql, function(err, rows){
        if(!err){
            console.log("solution is ", rows)
            res.render("room/list.ejs",{
                lists: rows
            })
        }else{
            console.log(err);
            res.json({
                error: "에러가 발생했습니다."
            })
        }
    })
}

const readRoom = (req, res) =>{
    let roomId = req.params.roomId;
    console.log(roomId)
    let sql = "select * from ttokttok.cenference where id=?";

    connection.query(sql, [roomId], function(err, rows){
        if(!err){
            console.log("solution is ", rows);
            res.render("room/view.ejs", {
                room: rows
            })
        }else{
            console.log(err);
            res.json({
                error: "에러가 발생했습니다."
            })
        }
    })
}

const reservation = (req, res) =>{
    let user = req.session.user;
    let room = req.body.room;
    let date = req.body.date;
    let time = req.body.time;
    let num = req.body.num;
    let sql = "insert into ttokttok.reservation(idx_member, idx_room, date_reserve, time_reserve, num_reserver) values(?, ?, ?, ?, ?)";
    console.log(user);
    
    connection.query(sql, [user, room, date, time, num], function(err, rows){
        if(!err){
            console.log("The solution is ", rows);
            res.render("room/success.ejs");
        }else{
            console.log(err);
            res.render("room/fail.ejs");
        }
    })

}

module.exports = {
    deleteRoom,
    readRooms,
    readRoom,
    reservation
}