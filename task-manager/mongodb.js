// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = require('mongodb')
const id = new ObjectID()
// console.log(id)
//const connectionURL = 'mongodb://127.0.0.1:27017'
const connectionURL = "mongodb+srv://faheem:Raja512*@cluster0-k2rv0.mongodb.net/test?retryWrites=true&w=majority";

const databaseName = 'task-manager'
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('connect failed')
    }
    const db = client.db(databaseName)
    // db.collection('users').deleteOne({
    //     name:'omer'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // db.collection('tasks').updateMany({ completed: false }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // const dbPeomise = db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID("5e5655fa7e5dc57fce3fc80c")
    //     },
    //     {
    //         $set: {
    //             name: 'abbas'

    //         }
    //         ,
    //         $inc:{
    //             age:5
    //         }
    //     })
    // dbPeomise.then((result) => {
    //     console.log('Success')
    // }).catch((error) => {
    //     console.log('Failed')
    // })
    db.collection('users').findOne({ name: 'omer' }, (error, user) => {
        if (error) {
            return console.log('Error while fetching data')
        }
        else if(!user){
            return console.log('No data found')
        }
        console.log(user)
    })
    // db.collection('tasks').find({ completed: true }).toArray((error, result) => {
    //     if (error) {
    //         return console.log('Error while fetching data')
    //     }
    //     console.log(result)
    // })

    // db.collection('tasks').find({ completed: true }).count((error, count) => {
    //     if (error) {
    //         return console.log('Error while fetching data')
    //     }
    //     console.log(count)
    // })
    //    db.collection("users").insertOne({
    //        name:'faheem',
    //        age:30
    //    },(error,result)=>{
    //        if(error){
    //            return console.log('Error occured while inserting')
    //        }
    //        console.log(result.ops)
    //    })
    // db.collection('users').insertMany([
    //     {
    //         name: 'omer',
    //         age: 300
    //     },
    //     {
    //         name: 'zain',
    //         age: 31
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error while inserting')
    //     }
    //     console.log('bulk inserted')
    // })
    // db.collection('tasks').insertMany([{
    //     description: 'exercise',
    //     completed: true
    // },
    // {
    //     description: 'work',
    //     completed: true
    // }, {
    //     description: 'sleep',
    //     completed: false
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Error while inserting')
    //     }
    //     console.log('tasks inserted successfully')
    // })
})