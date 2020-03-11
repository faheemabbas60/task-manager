require('./database/mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
// app.use((req, resp, next) => {
//     console.log(req.method, req.path)
//     // if (req.method === 'GET') {
//     //     resp.send('Get requests are disabled')
//     // }
//     // else {
//     //     next()
//     // }
//     resp.status(503).send('System is under maintenance please try again later')
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.listen(port, () => {
    console.log('Server is running at port ' + port)
})
// const bcrypt=require('bcryptjs')
// const encryptPassword=async()=>{
//     const planPassword='faheem123!'
//     const hashedPassword= await bcrypt.hash(planPassword,8)
//     console.log(planPassword)
//     console.log(hashedPassword)
//     const isMatch=await bcrypt.compare(planPassword,hashedPassword)
//     console.log(isMatch)
// }
// encryptPassword()
const jwt = require('jsonwebtoken')
const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismytoken', { expiresIn: '7 days' })
    console.log(token)
    const data = jwt.verify(token, 'thisismytoken')
    console.log(data)
}
//myFunction()