import mongoose from 'mongoose';
const coursesSchema =mongoose.Schema({
    
        course_name:    
        {
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        start_date:{
            type:String,
            required:true
        },
        end_date:{
            type:String,
            required:true
        },
    
},{timestamps:true}) 
const Courses=mongoose.model('Courses',coursesSchema)
export default Courses