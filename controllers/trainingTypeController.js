const TrainingType = require('../models/trainingTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create category
exports.createTrainingType = async(req, res, next)=>{
    try{
        const trainingT = await TrainingType.create({
            trainingTypeName: req.body.trainingTypeName,
            user:req.user.id
        });
        res.status(201).json({
            success: true,
            trainingT,

        })
    }catch(error){
        next(error);


    }
}

//all categories
exports.allTrainingType = async(req, res, next)=>{
    try{
        const trainingT = await TrainingType.find();
        res.status(200).json({
            success: true,
            trainingT,

        })
    }catch(error){
        next(error);


    }
}

//update training type
exports.updateTrainingType = async (req, res, next) => {
    try {
        const trainingT = await TrainingType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            trainingT
        })
    } catch (error) {
        next(error);
    }
}

//delete training type
exports.deleteTrainingType = async (req, res, next) => {
    try {
        const trainingT = await TrainingType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}