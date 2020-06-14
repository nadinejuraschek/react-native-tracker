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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: "Must provide e-mail and password! "});
    };

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({ error: 'No account found for this e-mail. Please register.' });
    };

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
        res.send({ token });
    } catch (err) {
        return res.status(404).send({ error: "Invalid password or e-mail." });
    };
});

module.exports = router;