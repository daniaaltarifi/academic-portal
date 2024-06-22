import { useEffect, useState } from "react"
import axios from "axios"
import LogOut from "./Auth/LogOut";

function CoursesList() {
    const [courses,setCourses] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get("http://localhost:7000/api/courses");
              const data = response.data;
              setCourses(data);
            } catch (error) {
              console.log(`Error getting data: ${error}`);
            }
          };
          fetchData();
    },[])
  return (
    <div>
 <div className="container_role">

<h2 className="title_role">Welcome to Student Portal</h2>
<LogOut />
</div>
        <table className="table table-success table-striped">
            <thead className="table_head" >

      <tr >
        <th scope="col">Course Name</th>
        <th scope="col">Description</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
      </tr>
      </thead>

    <tbody >
    {courses.map((course) => (
      <tr key={course._id}>
        <td>{course.course_name}</td>
        <td>{course.description}</td>
        <td>{course.start_date}</td>
        <td>{course.end_date}</td>
      </tr>
    ))}
    </tbody>
  </table></div>
  )
}

export default CoursesList
