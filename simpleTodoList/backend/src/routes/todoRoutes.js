const express = require('express');

const tododb = require('../modules/tododb.js');

const todoRouter = express.Router();

todoRouter.get('/getall', async (req, res) => {
    let todos = await tododb.getTodos();
    return res.json(todos);
});

todoRouter.post('/add', async (req, res) => {
    let success = await tododb.insertTodo(req.body.todoText);
    if (success == true) {
        return res.status(200).end();
    }
    return res.status(500).end();
});

todoRouter.get('/delete/:todoUUID', async (req, res) => {
    let success = await tododb.deleteTodo(req.params.todoUUID);
    if (success == true) {
        return res.status(200).end();
    }
    return res.status(500).end();
});

module.exports = todoRouter;