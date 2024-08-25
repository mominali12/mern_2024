import express from "express"
import { registerUser, loginUser, updateUser, deleteUser } from "../controller/usersController.js"

const router = express.Router()

//register user
router.post('/register', registerUser)


router.post('/login', loginUser)

// delete user
router.delete('/:id', deleteUser)

//update user
router.put('/:id', updateUser)


export {router as usersRoutes}