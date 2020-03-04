const express = require('express')
const Task = require('../models/task')
const router = new express.Router();
router.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        if (!tasks) {
            res.status(404).send()
        }
        else {
            res.status(201).send(tasks)
        }
    }).catch((e) => {
        res.status(400).send("Error while fetching" + e)
    })
})

router.get('/tasks/:id', (req, res) => {
    console.log(req.params)
    Task.findById(req.params.id).then((task) => {
        if (!task) {
            res.status(404).send()
        }
        else {
            res.status(201).send(task)
        }
    }).catch((e) => {
        res.status(400).send("Error while fetching" + e)
    })
})
router.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


module.exports=router