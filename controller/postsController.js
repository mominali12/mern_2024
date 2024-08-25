import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// *************** get all post *********************

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *************** get all post *********************

const getUserPosts = async (req, res) => {
  try {
    //grab user
    const user = await User.findById(req.user._id);
    const userPosts = await Post.find({ user: user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ userPosts, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *************** create new post *********************

const createPost = async (req, res) => {
  // grab data from request body
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    //grab user
    const user = await User.findById(req.user._id);

    const post = await Post.create({ user, title, body });
    res.status(200).json({ success: "new post created", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *************** delete post *********************

const deletePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check the post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  //check if post was created by loggedin user
  if (!post.user._id.equals(req.user._id)) {
    return res.status(401).json({ error: "Not authorized to delete post" });
  }

  try {
    console.log(post)
    await post.deleteOne();
    return res.status(200).json({ success: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// *************** update post *********************

const updatePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check the post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // grab data from request body
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  //check if post was created by loggedin user
  if (!post.user._id.equals(req.user._id)) {
    res.status(401).json({ error: "Not authorized to update post" });
  }

  try {
    await Post.updateOne({ title, body });
    res.status(200).json({ success: "post updated", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, getUserPosts, createPost, deletePost, updatePost };
