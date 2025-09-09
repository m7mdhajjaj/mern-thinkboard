import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/HomePage";
import NotePage from "./pages/Note";
import Create from "./pages/CreatePAge";
import EditPage from "./pages/EditPage";
import toast from  'react-hot-toast';
const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/note/:id' element={<NotePage/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<EditPage/>}/>
      </Routes>
    </div>
  )
}

export default App
