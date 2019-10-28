const { Router } = require('express')
const router = Router();
const member = require("./member");
const admin = require("./admin");

router.use("/member", member);
router.use("/admin", admin);

router.get('/', (req, res) => {
    res.render("index.ejs");
})

module.exports = router;