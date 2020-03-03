require('./database/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.post('/users', (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
        console.log('inserted', user)
    }).catch((e) => {
        res.status(400).send("user not created" + e)
        console.log('failed', e)
    })

})
app.get('/users', ((req, res) => {
    User.find({}).then((users) => {
        res.status(201).send(users)
        console.log('users', users)
    }).catch((e) => {
        res.status(400).send("Error while fetching" + e)
        console.log('failed', e)
    })
}))
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    console.log(req.params)
    User.findById(_id).then((user) => {
        if (!user) {
            res.status(404).send()
        }
        else {
            res.status(201).send(user)
            console.log('user', user)
        }

    }).catch((e) => {
        res.status(400).send("Error while fetching" + e)
        console.log('failed', e)
    })
})

app.get('/tasks', (req, res) => {
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

app.get('/tasks/:id', (req, res) => {
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
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
app.listen(port, () => {
    console.log('Server is running at port ' + port)
})