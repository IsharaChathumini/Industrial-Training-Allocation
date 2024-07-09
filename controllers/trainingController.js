const Training = require('../models/trainingModel');
const TrainingType = require('../models/trainingTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create category
exports.createTraining = async(req, res, next)=>{
    try{
        const training = await Training.create({
            title: req.body.title,
            description: req.body.description,
            salary:req.body.salary,
            location: req.body.location,
            trainingType: req.body.trainingType,
            user:req.user.id
        });
        res.status(201).json({
            success: true,
            training,

        })
    }catch(error){
        next(error);


    }
}


//single training

exports.singleTraining = async(req, res, next)=>{
    try {
        const training = await Training .findById(req.params.id);
        res.status(200).json({
            success: true,
            training 
        })
    } catch (error) {
        next(error);
    }

}


//update training by id.
exports.updateTraining = async (req, res, next) => {
    try {
        const training  = await Training .findByIdAndUpdate(req.params.training_id, req.body, { new: true }).populate('training Type', 'training TypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            training 
        })
    } catch (error) {
        next(error);
    }
}

//show trainings
exports.showTrainings = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // filter trainings by category ids
    let ids = [];
    const trainingTypeCategory = await TrainingType.find({}, { _id: 1 });
    trainingTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;

    //training by location
    let locations = [];
    const trainingByLocation = await Training.find({}, { location: 1 });
    trainingByLocation.forEach(val => {
        locations.push(val.location);
    });

    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;
   

    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Training.find({}).estimatedDocumentCount();
    const count = await Training.find({...keyword,trainingType: categ,location: locationFilter}).countDocuments();


    try {
        const trainings = await Training.find({...keyword,trainingType: categ,location: locationFilter}).sort({ createdAt: -1 }).skip( pageSize*(page - 1)).limit(pageSize);
        res.status(200).json({
            success: true,
            trainings,
            page,
            pages: Math.ceil(count/pageSize),
            count,
            setUniqueLocation
        })
    } catch (error) {
        next(error);
    }
} 


