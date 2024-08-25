import mongoose from "mongoose"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

// *************** create JWT *********************
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '10d'})
}

// *************** register user *********************

const registerUser = async (req, res) =>{
    // grab data from request body
    const {email, password} = req.body;

    // check the fields are not empty
    if (!email || !password){
        return res.status(400).json({error: 'All fields are required'});
    }

    try{
        const user_exists = await User.findOne({email})
        if (user_exists)
        {
            return res.status(400).json({error: 'email already taken'})
        }

        const salt = await bcrypt.genSalt();
        const hashed =  await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({email, password: hashed});
        //create JWT
        const token = createToken(user._id)
        res.status(200).json({success: 'new user created', user, token})
    } catch(error){
        res.status(500).json({error: error.message});
    }    
}


const loginUser = async (req, res) => {
    // grab data from request body
    const {email, password} = req.body;

    // check the fields are not empty
    if (!email || !password){
        return res.status(400).json({error: 'All fields are required'});
    }

    try{
        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({error: 'incorrect email'});
        }

        // check if password matches
        const match = await bcrypt.compare(password, user.password)
        if (!match)
        {
            return res.status(400).json({error: 'incorrect password'});
        }
        
        //create JWT
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch(error){
        res.status(500).json({error: error.message});
    } 
}

const updateUser = (req, res) => {
    return res.status(400).send("login user")
}

const deleteUser = (req, res) => {
    return res.status(400).send("login user")
}

// // *************** delete post *********************

// const deletePost = async (req, res) =>{
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({error: "Incorrect ID"})
//     }

//     // check the post exist
//     const post =  await Post.findById(req.params.id)
//     if (!post)
//     {
//         return res.status(400).json({error: "Post not found"})
//     }

//     try{
//         await post.deleteOne()
//         return res.status(200).json({success: "Post deleted successfully"})
//     } catch(error){
//         return res.status(500).json({error: error.message})
//     }
// }


// // *************** update post *********************

// const updatePost = async (req, res) =>{
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({error: "Incorrect ID"})
//     } 

//     // check the post exist
//     const post =  await Post.findById(req.params.id)
//     if (!post)
//     {
//         return res.status(400).json({error: "Post not found"})
//     }

//     // grab data from request body
//     const {title, body} = req.body;

//     // check the fields are not empty
//     if (!title || !body){
//         return res.status(400).json({error: 'All fields are required'});
//     }

//     try{
//         await Post.updateOne({title, body});
//         res.status(200).json({success: 'post updated', post})

//     } catch(error){
//         res.status(500).json({error: error.message});
//     } 
// }

export {registerUser, loginUser, updateUser, deleteUser}