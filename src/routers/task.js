const express = require('express')
const Task = require('../models/task')
const auth = require('..//middleware/auth')
const router = new express.Router();
router.get('/tasks/me', auth, (req, res) => {
    Task.find({ owner: req.user._id }).then((tasks) => {
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

router.get('/tasks/:id',auth,async (req, res) => {
    const _id = req.params.id
   
    try{
        
        const task=await Task.findOne({_id,owner:req.user._id})
        console.log('task',task)
        if(!task){
            return res.status(404).send()
        }
        return res.status(201).send(task)
    }catch(e){
        console.log('failed',e)
        res.status(400).send(e)
    }
})
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send({ error: 'invalid updates' })
        }
        const task = await Task.findOne({_id,owner:req.user._id})
        updates.forEach((update) => {
            task[updates] = req.body[updates]
        })
        await task.save()
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.status(201).send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router