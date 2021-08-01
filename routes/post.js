const express = require('express');
const post = require('../models/post');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new', { posts: new post() });
})

router.get('/:id', async (req, res) => {
    const newPost = await post.findById(req.params.id);
    if (newPost == null) {
        res.redirect('/');
    }
    res.render('show', { posts: newPost });
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