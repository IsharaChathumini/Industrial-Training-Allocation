const express = require('express');
const router = express.Router();
const { createTrainingType, allTrainingType,updateTrainingType,deleteTrainingType} = require('../controllers/trainingTypeController');
const { isAuthenticated ,isAdmin} = require('../middleware/auth');




//training type routes

// /api/type/create
router.post('/type/create',isAuthenticated, createTrainingType)
// /api/type/trainings
router.get('/type/training',allTrainingType)
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateTrainingType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteTrainingType)



module.exports = router;