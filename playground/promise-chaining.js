require('../src/database/mongoose')
const User = require('../src/models/user')
// User.findByIdAndUpdate('5e5cabb612bfbb69d6d09a27', { 'age': 29 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ 'age': 30 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateByIDandCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age})
    return count
}

updateByIDandCount('5e5cabb612bfbb69d6d09a27', 29).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})