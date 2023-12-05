const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const sequelize = require('./database/db')
const Todo = require('./models/todo')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))

app.get("/test", (req,res) => {
    res.send("Server alive")
})

app.post("/add",async(req,res) => {
    const {title,description} = req.body 

    const todo = await Todo.create({
        title,
        description
    })
    res.status(200).json(todo)
})

app.listen(process.env.PORT, async() => {
    try {
        await sequelize.authenticate()
        console.log('Connected to DB');
        console.log(`Server started on port ${process.env.PORT}`);
    } catch (error) {
        console.error(error)
    }
})