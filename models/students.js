const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email id already taken."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email.")
            }
        }
    },
    phone : {
        type : Number,
        required : true,
        unique : [true, "Phone number already taken."],
        min : 10
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false})){
                throw new Error("Please Enter a strong password")
            }
        }
    }
})

// Creating a new collection

const Student = new mongoose.model("Student", studentSchema);




module.exports = Student;