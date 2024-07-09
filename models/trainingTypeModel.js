const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;


const trainingTypeSchema = new mongoose.Schema({

    trainingTypeName: {
        type: String,
        trim: true,
        required: [true, 'Category is required'],
        maxlength: 70,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    
}, {timestamps: true})



module.exports = mongoose.model("TrainingType", trainingTypeSchema);
