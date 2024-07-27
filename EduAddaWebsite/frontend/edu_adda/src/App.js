import './App.css';
import Login from './components/login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/signup/signup';
import HomePage from './components/HomePage/HomePage';
import MockTests from './components/MockTestsInterface/MockTestsInterface';
import StudyMaterial from './components/StudyMaterial/StudyMaterial';
import UserDashboard from './components/UserDashboard/UserDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/HomePage" element={<HomePage/>}/>
          <Route path="/mockTests" element={<PrivateRoute element={MockTests} />} />
          <Route path="/StudyMaterials" element={<StudyMaterial/>}/>
           <Route path="/Dashboard" element={<UserDashboard/>}/>
          {/* <Route path="/contacts" element={<PrivateRoute Child={Table} />}/> */}
          {/* <Route path="/contacts" element={<Table />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

