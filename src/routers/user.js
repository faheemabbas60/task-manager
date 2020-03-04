const express = require('express')
const User = require('../models/user')
const router = new express.Router();

router.post('/users', async (req, res) => {
      console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
    // user.save().then(() => {
    //     res.status(201).send(user)
    //     console.log('inserted', user)
    // }).catch((e) => {
    //     res.status(400).send("user not created" + e)
    //     console.log('failed', e)
    // })

})
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    }
    catch (e) {
        res.status(400).send(e)
    }
    // User.find({}).then((users) => {
    //     res.status(201).send(users)
    //     console.log('users', users)
    // }).catch((e) => {
    //     res.status(400).send("Error while fetching" + e)
    //     console.log('failed', e)
    // })
})
router.get('/users/:id', (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' })
    }
    try {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router