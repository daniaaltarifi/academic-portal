import academicPortal from '../assets/academic-portal.jpg';
import { Link, useNavigate } from 'react-router-dom';
function UserType() {
    const navigate = useNavigate();
  
  const handleTeacher=()=>{
localStorage.setItem('isTeacher', "true")
   navigate('/signup')
  }
  const handleStudent=()=>{
    localStorage.setItem('isTeacher', "false")
   navigate('/signup')
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <img src={academicPortal} alt="Academic Portal" style={{ maxWidth: '100%', maxHeight: '50%' }} />
      <h1>Welcome to Academic Portal</h1>
      <p>Please select your role to proceed with the signUp:</p>
      <div>
        <button type="button" className="btn btn-primary " onClick={handleStudent}>Student</button>
        <button type="button" className="btn btn-primary ms-5"onClick={handleTeacher}>Teacher</button>
      </div>
      <p style={{marginTop:"15px"}}>already have account ? <Link to={'/login'}>Login</Link> </p>
    </div>
  );
}

export default UserType;
