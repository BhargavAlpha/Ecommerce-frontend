import React, { Profiler, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Submissions from './pages/submissions/Submissions';
import ProductDetail from './pages/productdetail/ProductDetail';
import Reviews from './pages/reviews/Reviews';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup/>}/ >
        <Route path="/login" element={<Login/>}/ >
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/my-submissions' element={<Submissions/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/reviews' element={<Reviews/>}/>
      </Routes>

    </Router>
  );
}

export default App;

