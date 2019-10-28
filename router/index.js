const { Router } = require('express')
const router = Router();
const member = require("./member");
const admin = require("./admin");
const room = require("./room");

router.use("/member", member);
router.use("/admin", admin);
router.use("/room", room);

router.get('/', (req, res) => {
    res.render("index.ejs");
})

module.exports = router;