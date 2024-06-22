import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AuthAndCourses.css";
import LogOut from "./Auth/LogOut";
function CreateUpdateCourse() {
  const [courses, setCourses] = useState([]);
  const [course_name, setCourse_name] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  useEffect(() => {
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
  }, []);
  const handleAdd = () => {
    setAddFormVisible(true);
    window.scrollTo(0, 700);
  };
  const submitCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/courses/create",
        {
          course_name: course_name,
          description: description,
          start_date: start_date,
          end_date: end_date,
        }
      );
      const result = response.data;
      console.log(result);
      setCourses([...courses, result]);
      setAddFormVisible(false);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err.message);
    }
  };

  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateId(id);
    window.scrollTo(0, 500);
    const selectedData = courses.find((data) => data._id === id);
    console.log(selectedData, "selectedData");
    if (selectedData) {
      setCourse_name(selectedData.course_name || "");
      setDescription(selectedData.description || "");
      setStart_date(selectedData.start_date || "");
      setEnd_date(selectedData.end_date || "");
    }
  };
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/api/courses/update/${id}`,
        { course_name, description, start_date, end_date }
      );
      console.log(response.data);
      setCourses((course) =>
        course.map((data) => (data.id === id ? response.data : data))
      );
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div>
      <div className="container_role">
        <LogOut />

        <h2 className="title_role">
          Welcome to Teacher Portal
        </h2>
      </div>
      <table className="table table-success table-striped">
        <thead className="table_head">
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.course_name}</td>
              <td>{course.description}</td>
              <td>{course.start_date}</td>
              <td>{course.end_date}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openUpdateForm(course._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary ms-5 btn-add"
        onClick={handleAdd}
      >
        Add
      </button>
      <div className="container ">
        <div className="row">
          <div className="col ">
            {addFormVisible && (
              <div id="form-data" className="control-form">
                <h1>Add Course</h1>
                <form onSubmit={submitCourse}>
                  <label htmlFor="course name">Course Name:</label>
                  <input
                    type="text"
                    name="course_name"
                    onChange={(e) => setCourse_name(e.target.value)}
                  />
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="date">Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    className="date-style"
                    onChange={(e) => setStart_date(e.target.value)}
                  />
                  <label htmlFor="date">End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    className="date-style mb-3"
                    onChange={(e) => setEnd_date(e.target.value)}
                  />
                  <div className="d-flex">
                    <input type="submit" value="Add" />
                    <input
                      type="submit"
                      value="Cancel"
                      style={{ backgroundColor: "#606162" }}
                      onClick={() => setAddFormVisible(false)}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="col">
            {/* update form */}
            {isUpdateFormVisible && (
              <div id="form-data" className="control-form">
                <h1>Edit Course</h1>
                <form onSubmit={() => handleUpdate(updateId)}>
                  <label htmlFor="course name">Course Name:</label>
                  <input
                    type="text"
                    name="course_name"
                    value={course_name}
                    onChange={(e) => setCourse_name(e.target.value)}
                  />
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="date">Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    className="date-style"
                    onChange={(e) => setStart_date(e.target.value)}
                  />
                  <label htmlFor="date">End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    className="date-style mb-3"
                    onChange={(e) => setEnd_date(e.target.value)}
                  />
                  <div className="d-flex">
                    <input
                      type="submit"
                      value="Update"
                      onClick={() => handleUpdate(updateId)}
                    />
                    <input
                      type="submit"
                      value="Cancel"
                      style={{ backgroundColor: "#606162" }}
                      onClick={() => setIsUpdateFormVisible(false)}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUpdateCourse;
