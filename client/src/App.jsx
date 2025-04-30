import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './ThemeContext';  // ✅ Correct Provider

import ProjectDetails from './pages/ProjectDetail';
import ServiceDetails from './pages/ServiceDetail';

export default function App() {
  return (
    <ThemeProvider>  {/* ✅ Wrap inside ThemeProvider */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projectDetail/:_id' element={<ProjectDetails/>} />
          <Route path='/serviceDetail/:_id' element={<ServiceDetails/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
