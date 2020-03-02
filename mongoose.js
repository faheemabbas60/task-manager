const mongoose = require('mongoose')
const validator = require('validator')
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required:true,
//         trim: true,
//         validate(value) {
//             if (value.length <= 6) {
//                 throw new Error('Password must be greater then 6')
//             }
//             else if(value.includes('password')){
//                 throw new Error('Password must not contain password word')
//             }
//         }

//     }
// })
// const me = new User({
//     name: 'omer',
//     email: 'faheem@gmail.com',
//     age: 27,
//     password:'ali123*'
// })
// me.save().then(() => {
//     console.log('Success ', me)
// }).catch((error) => {
//     console.log('Error', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    }
})
const task = new Task({
    description: 'Gym'
    
})
task.save().then(() => {
    console.log('Success', task)
}).catch((error) => {
    console.log('Failure', error)
})