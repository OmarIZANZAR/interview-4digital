const express = require("express")
const mongoose = require("mongoose")
const Student = require("../models/Student")

const router = express.Router();

// GET ALL STUDNETS:
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1})
        res.status(200).json({isError: false, message: "all students", students})
    } catch (err) {
        res.status(500).json({isError: true, message: "something went wrong", info: err})
    }
})

// CREATE A STUDENT:
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student( req.body )
        await newStudent.save()
        res.status(201).json({isError: false, message: "student saved succefuly", student: newStudent})
    } catch (err) {
        res.status(400).json({isError: true, message: "student not saved", info: err})
    }
})

// UPDATE A STUDENT BY ID:
router.put('/:id', async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "student not found"})
        
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, {...req.body}, {new: true})

        if(updatedStudent === null){
            return res.status(404).json({isError: true, message: "student not found"})
        }
        
        res.status(201).json({isError: false, message: `student ${id} updated`, student: updatedStudent })
    } catch (err) {
        res.status(500).json({isError: true, message: "student not updated", info: err})
    }
})

// DELETE A STUDENT BY ID:
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "student not found"})

    try {
        const deletedStudent = await Student.findByIdAndDelete(id)

        if(deletedStudent === null){
            return res.status(404).json({isError: true, message: "student not found"})
        }
        
        res.status(200).json({isError: false, message: `student ${id} deleted`, student: deletedStudent })
    } catch (err) {
        res.status(500).json({isError: true, message: "student not deleted", info: err})
    }
})

module.exports = router;