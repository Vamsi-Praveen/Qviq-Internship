import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import cors from "cors"
import { initDB } from "./config/dbConfig.js"
import userRouter from "./routes/user.routes.js"

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000;

//routes

//starting test get route

app.get('/api', (req, res) => {
    return res.status(200).send({ 'message': "API is up and running 🚀" })
})

//registration of user

app.use('/api/', userRouter)



initDB()

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})