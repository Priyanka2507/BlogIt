const express = require('express');
const Pusher = require("pusher");
const post = require('../models/post');
const router = express.Router();
const comment = require('../models/comment');

router.get('/new', (req, res) => {
    res.render('new', { posts: new post() });
})

router.get('/comment/:id', async (req, res) => {
    const newPost = await post.findById(req.params.id);
    if (newPost == null) {
        res.redirect('/');
    }
    res.render('comment', { comm: new comment(), posts: newPost });
})

router.get('/:id', async (req, res) => {
    const newPost = await post.findById(req.params.id);
    if (newPost == null) {
        res.redirect('/');
    }
    const comments = await comment.find({
        blogId: req.params.id
    }).sort({
        date: 'desc'
    })
    res.render('show', { posts: newPost, comm: comments });
})

router.get('/edit/:id', async (req, res) => {
    const editPost = await post.findById(req.params.id);
    res.render('edit', { posts: editPost });
})

router.delete('/:id', async (req, res) => {
    await post.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

router.put('/:id', async (req, res) => {
    editpost = await post.findById(req.params.id)
    editpost.title = req.body.title
    editpost.description = req.body.description
    editpost.content = req.body.content
    try {
        editpost = await editpost.save();
        res.redirect(`/posts/${editpost.id}`);
    } catch (err) {
        console.log(err);
        res.render('edit', { posts: editPost });
    }
})


router.post('/comment/:id', async (req, res) => {    
    let newComm = new comment({
        username: req.body.username,
        comment: req.body.comment,
        blogId: req.params.id
    })
    try {
        newComm = await newComm.save();
        res.redirect(`/posts/${newComm.blogId}`);
    } catch (err) {
        console.log(err);
        res.render('/');
    }
})


router.post('/', async (req, res) => {
    let newPost = new post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })
    try {
        newPost = await newPost.save();
        res.redirect(`/posts/${newPost.id}`);
    } catch (err) {
        console.log(err);
        res.render('new', { posts: newPost });
    }
})

module.exports = router;