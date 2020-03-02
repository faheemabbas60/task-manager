//mongoose config file
const mongoose = require('mongoose')
const dbURL='mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



