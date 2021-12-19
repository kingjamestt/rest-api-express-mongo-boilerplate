const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Gets all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(400);
        res.json({ message: err });
    }
});

//Gets a specific post by ID
router.get('/:postId', async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postId);
        res.json(foundPost);
    } catch (err) {
        res.status(400);
        res.json({ message: err });
    }
});

//Submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.status(400);
        res.json({ message: err })
    }
});

//Deletes a specific post
router.delete('/:postId', async (req, res) => {
    try {
        // const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        const deletedPost = await Post.remove({ _id: req.params.postId });
        res.json(deletedPost);
    } catch (err) {
        res.status(400);
        res.json({ message: err })
    }
});

//Updates a specific post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(400);
        res.json({ message: err })
    }
});

module.exports = router;