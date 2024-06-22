import Course from'../models/coursesModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
const getCourses=asyncHandler(async(req,res)=>{
    const courses=await Course.find({})
    res.status(200).json(courses)
})


const createCourse = asyncHandler(async (req, res) => {
    const { course_name, description, start_date, end_date } = req.body;

    if (!course_name || !description || !start_date || !end_date) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const existCourse = await Course.findOne({ course_name });

    if (existCourse) {
        res.status(400);
        throw new Error('Course already exists');
    }

    const newCourse = new Course({ course_name, description, start_date, end_date });

    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (error) {
        res.status(500);
        throw new Error(`Invalid course data: ${error.message}`);
    }
});


const updateCourse = asyncHandler(async (req, res) => {
    const courseId = req.params._id;
    const editcourse = await Course.findById(courseId);

    if (editcourse) {
        editcourse.course_name = req.body.course_name || editcourse.course_name;
        editcourse.description = req.body.description || editcourse.description;
        editcourse.start_date = req.body.start_date || editcourse.start_date;
        editcourse.end_date = req.body.end_date || editcourse.end_date;

        const updatedCourse = await editcourse.save();
        res.status(200).json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});


export {getCourses,createCourse,updateCourse}