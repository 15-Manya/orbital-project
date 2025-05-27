import './index.css';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Questions from './components/Questions/Questions';
import {BrowserRouter, Routes, Route} from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<LandingPage />}/>
        <Route path='/login' element ={<Login />} /> 
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/questions' element= {<Questions/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
