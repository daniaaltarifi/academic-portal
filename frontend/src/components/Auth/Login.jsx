import { useState } from "react";
import '../../assets/css/AuthAndCourses.css'

import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  axios.defaults.withCredentials = true;
  const submitUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7000/api/student/auth",
        {
          email: email,
          password: password,
        }
      );

      const result = response.data;
      const isTeacher = response.data.isTeacher;
      console.log("tech" + isTeacher);
      console.log(result);
      if (isTeacher === true) {
        navigate("/control");
      } else {
        navigate("/courses");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Invalid email or password");
          setErrorMessage("Invalid email or password");
        } else {
          console.error("Server Error:", error.response.status);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="form-user">
        <div id="form-data" >

        <h1>Login</h1>
        <form onSubmit={submitUser}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage} </p>}

          <input type="submit" value="Submit" />
        </form>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
