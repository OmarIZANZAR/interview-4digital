const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Date, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Student = mongoose.model('Student', StudentSchema)
module.exports = Student