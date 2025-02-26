const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;
const jwt = require("jsonwebtoken");

const trainingHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    studentmail: {
        type: String,
        trim: true,
        required: [true, 'studentmail is required'],
        maxlength: 32,
        unique: true,
        //match: [
            //'please add your studentmail'
        //]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
       // minlength: [6, 'Password must have at least (6) characters'],
    },

    trainingHistory: [trainingHistorySchema],


    role: {
        type: Number,
        default: 0
    },

}, {timestamps: true})

//encryping password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = mongoose.model("User", userSchema);