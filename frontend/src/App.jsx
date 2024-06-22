import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Auth/Login.jsx';
import SignUp from './components/Auth/SignUp.jsx'
import UserType from './components/UserType.jsx';
import CoursesList from './components/CoursesList.jsx';
import CreateUpdateCourse from './components/CreateUpdateCourse.jsx';
function App() {
  return (
    <>
      <ToastContainer />
      <main className='py-3'>
        <Routes>
          <Route path='/' element={<UserType/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/courses' element={<CoursesList/>}/>
          <Route path='/control' element={<CreateUpdateCourse/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
