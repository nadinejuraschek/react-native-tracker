// NPM PACKAGES
const   mongoose    = require("mongoose"),
        bcrypt      = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function() {
    // regular function lets this refer to User, not Schema
    if (!user.isModified('password')) {
        return next();
    };
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        };
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            };
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(enteredPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(enteredPassword, this.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            };
            if (!isMatch) {
                return reject(false);
            };
            resolve(true);
        });
    });
};

mongoose.model("User", userSchema);