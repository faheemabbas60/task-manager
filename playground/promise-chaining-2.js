require('../src/database/mongoose')
const Task = require('../src/models/task')
Task.findByIdAndDelete('5e5cd892656154595a8147a0').then((task) => {
    console.log('deleted ',task)
    return Task.countDocuments({'completed':false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})