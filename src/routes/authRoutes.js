// NPM PACKAGES
const   express     = require("express"),
        mongoose    = require("mongoose"),
        jwt         = require("jsonwebtoken"),
        User        = mongoose.model("User");

const   router  = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
        res.send({ token });
        res.send("You are trying to sign up.");
    } catch (err) {
        return res.status(422).send(err.message);
    };
});

router.post("/login", (req, res) => {
    res.send("You are trying to log in.");
});

module.exports = router;