import { useState, useEffect } from 'react'
import axios from 'axios'  
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Edit from './pages/edit.jsx'
import Tasks from './pages/Tasks.jsx'
import Add from './pages/Add.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/Add" element={<Add />} />
        <Route path="*" element={<h1 className="h-[500px] text-center text-2xl text-red-500 flex justify-center items-center">404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}



export default App
