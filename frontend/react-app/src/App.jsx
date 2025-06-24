import './index.css';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp'
import Question1 from './components/Questions/Question1/Question1';
import Question2 from './components/Questions/Question2/Question2';
import Question3 from './components/Questions/Question3/Question3';
import PersonalizeExperience from './components/Questions/PersonalizeExperience/PersonalizeExperience';
import PersonalizeLibrary from './components/Questions/PersonalizeLibrary/PersonalizeLibrary';
import ForgotPassword from './components/Login/ForgotPassWord/ForgotPassWord';
import Age from './components/Questions/Age/Age';
import HomePage from './components/Home Page/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router';
import { UserResponse } from './components/Questions/UserResponse';

function App() {
  return (
    <UserResponse>
        <BrowserRouter>
        <Routes>
          <Route path='/' element ={<LandingPage />}/>
          <Route path='/login' element ={<Login />} /> 
          <Route path='/signup' element = {<SignUp/>}/>
          <Route path="/personalizeExperience" element={<PersonalizeExperience/>}/>
          <Route path="/age" element={<Age/>}/>
          <Route path="/q1" element={<Question1/>}/>
          <Route path="/q2" element={<Question2/>}/>
          <Route path='/q3' element={<Question3/>}/>
          <Route path="/personalizeLibrary" element={<PersonalizeLibrary/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element ={<HomePage/>} />

        </Routes>
      </BrowserRouter>
    </UserResponse>
  );
}

export default App;
