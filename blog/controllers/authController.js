const createError = require('http-errors');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email, password: req.body.password })

    .then(user => {

        if (!user) throw createError(401, 'Incorrect email or password');

        let data = {
            id: user._id,

            name: user.name,

            email: user.email
        };

        let token = jwt.sign(data, process.env.JWT_SECRET);

        res.json({ token: token, _id: user._id });

    });
};


exports.me = (req, res, next) => {

    res.json(req.user)
};