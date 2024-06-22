import express from 'express';
const router=express.Router();
import { getCourses,createCourse,updateCourse } from '../controllers/coursesController.js';
router.get('/',getCourses)
router.post('/create',createCourse)
router.put('/update/:_id',updateCourse)

export default router