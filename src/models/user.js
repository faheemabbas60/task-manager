const mongoose = require('mongoose')
const validator = require('validator')
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
        required:true,
        trim: true,
        validate(value) {
            if (value.length <= 6) {
                throw new Error('Password must be greater then 6')
            }
            else if(value.includes('password')){
                throw new Error('Password must not contain password word')
            }
        }

    }
})
module.exports=User