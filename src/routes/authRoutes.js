// NPM PACKAGES
const   express = require("express");

const   router  = express.Router();

router.post("/signup", (req, res) => {
    console.log(req.body);
    res.send("You are trying to sign up.");
});

router.post("/login", (req, res) => {
    res.send("You are trying to log in.");
});

module.exports = router;