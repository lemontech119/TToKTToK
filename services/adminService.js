const mysql = require('mysql');
const conn = require("../dbconnection.js");
const connection = mysql.createConnection(conn);

const loginAdmin = (req, res) => {
    let user_id = req.body.userid;
    let password = req.body.password;
    let sql = "select * from ttokttok.member where member_id=?";
    connection.query(sql, [user_id], function (err, rows) {
        if (!err) {
            if (rows.length === 0) {
                res.json({
                    result: "NoId"
                })
                return;
            } else if (password != rows[0].password) {
                res.json({
                    result: "noPassword"
                })
                return;
            } else {
                if(rows.role != "admin"){
                    res.json({
                        result: "noAdmin"
                    })
                }
                req.session.user = user_id;
                req.session.save(function () {
                    res.redirect("/admin/append.ejs");
                })
                return;
            }
        }
    })
}

const createConference = (req, res) =>{
    let name = req.body.name;
    let person = req.body.person;
    let intro = req.body.intro;
    let image = req.file.path;
    let imgPath = "http://localhost:3000\\" + image.substring(7);
    let sql = "insert into ttokttok.cenference (name_room, num_person, intro, image) values(?, ?, ?, ?)";

    connection.query(sql, [name, person, intro, imgPath], function(err, rows){
        if(!err){
            res.redirect("/admin/append")
        }else{
            res.send("실패")
        }
    })
}

module.exports = {
    loginAdmin,
    createConference
}