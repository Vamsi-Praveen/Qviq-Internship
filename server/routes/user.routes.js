import express from "express"
import { deleteUser, getUser, getUserByEmail, registerUser, updateUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.post('/register-user', registerUser)
userRouter.get('/get-user/:id', getUser)
userRouter.put('/update-user/:id', updateUser)
userRouter.delete('/delete-user/:id', deleteUser)
userRouter.post('/get-user-email', getUserByEmail)


export default userRouter