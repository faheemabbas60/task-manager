require('../src/database/mongoose')
const Task = require('../src/models/task')
// Task.findByIdAndDelete('5e5cd892656154595a8147a0').then((task) => {
//     console.log('deleted ',task)
//     return Task.countDocuments({'completed':false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const findByIdAndDelete = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}
findByIdAndDelete('5e5cd888656154595a81479f', true).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})