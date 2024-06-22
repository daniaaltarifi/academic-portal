import { useEffect, useState } from "react";
import '../../assets/css/AuthAndCourses.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [isTeacher, setIsTeacher] = useState(false);
  const navigate = useNavigate()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

useEffect(()=>{
  const teacherStatus=localStorage.getItem('isTeacher')
  if(teacherStatus==="true") {
    setIsTeacher(true)
  }
},[])
  const submitUser = async (e) => {
  e.preventDefault()
  console.log("teacher 1" +isTeacher)

    try {
      const response = await axios.post(
        'http://localhost:7000/api/student',
        {
          name:name,
          email: email,
          password: password,
          isTeacher:isTeacher,
        }
      );
     console.log("teacher" +isTeacher)
     localStorage.removeItem('isTeacher')
      const result = response.data; 
      console.log(result)
      navigate("/login")

    } catch (err) {
      console.log(err.message);
    }
  };

  

  return (
    <div className="container">

      <div className="form-user">
        <div id="form-data">

        <h1>Sign Up</h1>
        <form onSubmit={submitUser}>
        <label htmlFor="username">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={email}
            onChange={handleEmailChange} />
          <label htmlFor="password" >Password:</label>
          <input type="password" id="password" name="password"
            onChange={handlePasswordChange} />
          <input type="submit" value="Submit" />
        </form>
        </div>

      </div>
    </div>

  );
};

export default SignUp;
