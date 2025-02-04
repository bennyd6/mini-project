import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import './App.css'
import RecordLand from './components/recordLand';

function App() {
  return (
    <>
    <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/record-land" element={<RecordLand />} />
        </Routes>
   </Router>
    </>
  );
}

export default App;
