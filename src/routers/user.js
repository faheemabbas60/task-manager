const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = new multer({

    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload jpg,jpeg,png file'))
        }
        cb(undefined, true)
    }
})
const router = new express.Router();

router.post('/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
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
router.post('/users/allUsers', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(400).send()
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, (req, res) => {
    try {
        req.user.tokens = []
        req.user.save()
        res.status(201).send()

    }
    catch (e) {
        res.status(500).send()
    }
})
router.get('/users/me', auth, async (req, res) => {

    res.status(201).send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' })
    }
    try {
        const user = await User.findById(req.user._id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        //  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.user._id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

const middleware = (req, res, next) => {
    throw new Error('called from middleware')
}
router.post('/users/me/avatar', auth, upload.single('upload'), async (req, res) => {
    req.user.avatar = req.file.buffer
    //  console.log(req.user)
    await req.user.save('Profile pic added')
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    req.user.save()
    res.send('Profile pic removed')
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send(e)
    }
})
module.exports = router