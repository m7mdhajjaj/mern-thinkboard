import React from 'react'
import { Link } from 'react-router-dom';
import {PlusIcon} from "lucide-react"
const NavBar = () => {
  return (
    <header className=' bg-base-300 text-white '>
      <div className='container mx-auto flex justify-between items-center px-4 py-3'>
        <div className='flex items-center justify-around w-full'>
            <h1 className='text-2xl font-bold text-green-500 ml-4'>ThinkBoard</h1>
            <div className='flex items-center gap-2 mr-4'>
                <Link to='/create' className='w-30 btn btn-primary flex items-center gap-2 hover:btn-primary-focus transition-colors bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-black rounded-xl px-4 py-2'>
                    <PlusIcon className='size-4'/>
                    <span>New Note</span>
                </Link>
            </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar