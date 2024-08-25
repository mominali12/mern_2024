import express from "express"
import { createPost, getPosts, getUserPosts, deletePost, updatePost } from "../controller/postsController.js"
import auth from "../middlewares/auth.js"

const router = express.Router()

//get all posts
router.get('/', getPosts)

//get all posts by logged-in user
router.get('/user', auth, getUserPosts)

// add new post
router.post('/create', auth, createPost)

// delete new post
router.delete('/:id', auth, deletePost)

//update post
router.put('/:id', auth, updatePost)


export {router as postsRoutes}