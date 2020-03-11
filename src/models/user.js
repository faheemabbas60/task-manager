const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task=require('../models/task')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length <= 6) {
                throw new Error('Password must be greater then 6')
            }
            else if (value.includes('password')) {
                throw new Error('Password must not contain password word')
            }
        }

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'thisistokenapp')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

userSchema.methods.toJSON =  function () {
    const user = this
    //console.log(user)
    const userObject = user.toObject()
    // console.log('object',userObject)
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ 'email': email })
   // console.log('user', user)
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log('isMatch', isMatch)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    console.log('just before saving', user.isModified('password'))
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        console.log('password modified')
    }
    next()

})
userSchema.pre('remove',async function(next){
    const user=this
    Task.deleteMany({owner:user._id})
    next()
})
const User = mongoose.model('User', userSchema
)
module.exports = User