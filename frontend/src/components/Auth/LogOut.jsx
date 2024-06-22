import axios from 'axios';
import { useNavigate } from 'react-router';
function LogOut() {
const navigate = useNavigate()
    const handleLogout=async()=>{
    try {
      const response = await axios.post('http://localhost:7000/api/student/logout',{},{withCredentials:true});
      if (response.status===200){
    console.log(response.data.message)
    navigate('/')
      }
    } catch (error) {
      console.log("Faield to Logout"+ error.message)
    }
      }
  return (
    <div>
           <button
          type="button"
          className="btn btn-primary ms-5"
          onClick={handleLogout}
        >
          Logout
        </button>
    </div>
  )
}

export default LogOut