const express = require("express");
const { auth } = require("../middleware/auth");
const { PostModel } = require("../models/postSchema");

const postRouter = express.Router();

postRouter.use(auth);

//GET POSTS
postRouter.get('/', async (req, res) => {
    // const { device } = req.query;
    // const query = { user: req.user.id };
  
    // if (device) {
    //   query.device = device;
    // }
  
    try {
      const posts = await PostModel.find({ userID: req.body.userID });
      res.json(posts);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  //ADD POSTS
  postRouter.post('/add', async (req, res) => {
    // const { title, body, device } = req.body;
    try {
      const post = new PostModel(req.body);
      await post.save();
      res.status(200).json({ message: 'Post created successfully.' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  //EDIT POSTS
  postRouter.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, body, device } = req.body;
  
    try {
      const post = await PostModel.findOneAndUpdate(
        { _id: postId, user: req.user.id },
        { title, body, device },
        { new: true }
      );
  
      if (!post) {
        return res.status(200).json({ message: 'Post not found or unauthorized.' });
      }
  
      res.json({ message: 'Post updated successfully.' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  });
  

  //DELETE POST
  postRouter.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await PostModel.findOneAndRemove({ _id: postId, user: req.user.id });
  
      if (!post) {
        return res.status(200).json({ message: 'Post not found or unauthorized.' });
      }
  
      res.json({ message: 'Post deleted successfully.' });
    } catch (err) {
      
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = {
  postRouter,
};
