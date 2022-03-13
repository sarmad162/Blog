const Post = require('../models/post');

const createError = require('http-errors');


exports.create = (req, res, next) => {

    let model = new Post({

        title: req.body.title,

        content: req.body.content,

        auther: req.user.id

    });

    model.save()

    .then(post => {

        res.json();

    })

    .catch(next);

};

exports.list = (req, res, next) => {

    Post.find()

    .select('-comments')

    .sort({ created_at: 'desc' })

    .populate('auther', 'name')

    .then(posts => {

            res.json(posts);
        })
        .catch(next);

};

exports.details = (req, res, next) => {

    let postId = req.params.id;

    Post.findById(postId)

    .populate('auther', 'name')

    .populate('comments.auther', 'name')

    .then(post => {

        if (!post) throw createError(404);

        res.json(post);

    })

    .catch(next);
};

exports.update = (req, res, next) => {

    let postId = req.params.id;

    let data = {

        title: req.body.title,

        content: req.body.content
    };

    Post.findOneAndUpdate({ _id: postId, auther: req.user.id }, data, { runValidators: true })

    .then(post => {
            if (!post) throw createError(404);

            res.json();

        })
        .catch(next);

};

exports.delete = (req, res, next) => {

    let postId = req.params.id;

    Post.findOneAndDelete({ _id: postId, auther: req.user.id })
        .then(post => {
            if (!post) throw createError(404);

            res.json();
        })

    .catch(next);
};