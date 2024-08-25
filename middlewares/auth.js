import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const auth = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "Authorization token not found"})
    }
    
    const token = authorization.split(" ")[1]

    try{
        //decode and extract userid from token
        const {_id} = jwt.verify(token, process.env.SECRET)
        // save user in request
        req.user = await User.findById(_id)

        next()
    } catch (error){
        res.status(401).json({error})
    }
}

export default auth
