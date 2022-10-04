const mongoose = require('mongoose')

const ConnectDB = async () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const conn = await mongoose.connect("mongodb://localhost:27017/4digital")
            console.log(`mongodb connected to db: ${conn.connection.name}...`)
            resolve(conn)
        } catch (error) {
            console.log('mongodb connection error')
            console.error(error)
            reject(error)
            process.exit(1)
        }
    })
} 

module.exports = ConnectDB