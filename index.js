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

app.get("/todos", async(req,res)=> {
    const todos = await Todo.findAll()
    return res.status(200).json(todos)
})

app.get("/todo/:id", async(req,res) => {
    const {id} = req.params
    const todo = await Todo.findByPk(id)
    if(!todo){
        return res.status(404).json("todo not found")
    }
    return res.status(200).json(todo)
})

app.put("/todo/:id", async(req,res) => {
    const {id} = req.params
    const {title,description} = req.body

    const todo = await Todo.findByPk(id)

    if(!todo){
        return res.status(404).json({ error: 'Todo not found' });
    }

    todo.title = title
    todo.description = description

    await todo.save()

    return res.status(200).json(todo);
})

app.delete("/todo/:id", async(req,res) => {
    const {id} = req.params

    const todo = await Todo.findByPk(id)

    if(!todo){
        return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy()

    return res.status(200).json("todo deleted");
})

app.post("/todos",async(req,res) => {
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