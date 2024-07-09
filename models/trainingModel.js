const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;


const trainingSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
        
    },

    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
        
    },

    location: {
        type: String,
        
    },
    available: {
        type: Boolean,
        default: true
        
    },
    trainingType: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"TrainingType",
        required:true
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    },
    
}, {timestamps: true})



module.exports = mongoose.model("Training", trainingSchema);
