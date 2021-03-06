const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})
taskSchema.pre('save', async function (next) {
    const task = this
    console.log('task pre called')
    if (task.isModified('description')) {
        task.description = task.description
    }
    next()
})
const Task = mongoose.model('Task', taskSchema)
module.exports = Task