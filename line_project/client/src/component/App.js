import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./css/main.css";
import MapPage from './view/map/MapPage';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
};