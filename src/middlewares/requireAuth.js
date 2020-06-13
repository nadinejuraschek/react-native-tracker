// NPM PACKAGES
const   jwt         = require('jsonwebtoken'),
        mongoose    = require('mongoose'),
        User        = mongoose.model('User');

module.exports = (res, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    };

    // split token from Authorization Bearer
    const token = authorization.replace('Bearer ', '');
    // verify token with jwt
    jwt.verify(token, process.env.APP_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        };
        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};