const express = require("express");
const Student = require("../models/students");

// 1. Create a new router
const router = new express.Router();


router.get("/", (req,res) => {
    res.json({message : "Api is working"});
})


// router.post("/api/students", (req,res) => {
//     const user = Student(req.body);
//     user.save().then(() => {
//         res.status(201);
//         res.json(user);
//     }).catch((e) => {
//         res.status(400);
//         console.log(`Data not saved --> ${e}`)
//     });

// })


router.post("/api/students", async (req,res) => {
    try{
        const user = Student(req.body);
        const createUser = await user.save();
        res.status(201);
        res.json(createUser);
    }catch(e){
        res.status(400);
        res.send(`Data not saved --> ${e}`)
    }
})


router.get("/api/students", async (req,res) => {
    try{
        const readUsers = await Student.find();
        res.status(200);
        res.json(readUsers);
    }catch(e){
        res.status(400);
        res.send(`Cannot fetch users --> ${e}`)
    }
})

// getting individual student data with id.

router.get("/api/students/:id", async (req,res) => {
    const id = req.params.id;
    try{
        const getUser = await Student.find({_id : id});
        res.status(200);
        res.json(getUser);
    }catch(e){
        res.status(400);
        res.send(`Cannot fetch users --> ${e}`)
    }
})

// getting individual student data with name.

// router.get("/api/students/:name", async (req,res) => {
//     const user = req.params.name;
//     console.log(user);
//     try{
//         const getUser = await Student.find({name : user});
//         res.status(200);
//         res.json(getUser);
//     }catch(e){
//         res.status(400);
//         res.send(`Cannot fetch users --> ${e}`)
//     }
// })

// Update user with id, use patch to update a specific field.

router.patch('/api/students/:id' , async (req,res) => {
    const _id = req.params.id;
    try {
        const updateUser = await Student.findByIdAndUpdate(_id , req.body,{new :true});
        res.status(200);
        res.json(updateUser);
    } catch (e) {
        res.status(500);
        res.json({message : `Could not update user --> ${e}`})
    }
})

// Update user with name

// router.patch('/api/students/:name' , async (req,res) => {
//     const name = req.params;
//     try {
//         const updateUser = await Student.updateMany(name , req.body,{new :true});
//         const findUser = await Student.find(name);
//         res.status(200);
//         res.json(findUser);
//     } catch (e) {
//         res.status(400);
//         res.json({message : `Could not update user --> ${e}`})
//     }
// })

// Find By Id And Delete.

router.delete('/api/students/:id' , async (req,res) => {
    const _id = req.params.id;
    try {
        const deleteUser = await Student.findByIdAndDelete(_id);
        res.status(200);
        res.json(deleteUser);
    } catch (e) {
        res.status(500);
        res.json({message : `Could not delete user --> ${e}`})
    }
})

module.exports = router