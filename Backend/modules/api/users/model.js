const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userModel = new Schema(
    {
        avatar: { type: String, default: '' },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value); // ktra xem co hop le khong tra ve true false
                },
                message: "{VALUE} is not a valid email address!"
            }
        },
        active: { type: Boolean, default: true },
    },
    { timestamps: { createdAt: "createdAt" } }
)

userModel.pre('save', function (next) { // ham next thuc hien thi thuc hien ham save, next(err) thi khong thuc hien
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt
        .genSalt(12)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err));
});

module.exports = mongoose.model("users", userModel)