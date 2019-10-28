const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

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

module.exports = {
    readRooms,
    readRoom
}