import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/HomePage";
import NotePage from "./pages/Note";
import Create from "./pages/CreatePAge";
import toast from  'react-hot-toast';
const App = () => {
  return (
    <div>
      <button onClick={()=>toast.success('hello')}>click me</button>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/note/:id' element={<NotePage/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default App
