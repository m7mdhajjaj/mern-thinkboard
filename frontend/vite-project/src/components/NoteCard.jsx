import React from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash2 } from 'lucide-react'

const NoteCard = ({ note }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add delete functionality here
    console.log('Delete note:', note._id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add edit functionality here
    console.log('Edit note:', note._id);
  };

  return (
    <div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-700/50 hover:border-green-500/30 backdrop-blur-sm'>
      <Link to={`/notes/${note._id}`} className='block group'>
        <h2 className='text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-2'>{note.title}</h2>
        <p className='text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm'>{note.content}</p>
      </Link>
      
      <div className='flex justify-between items-end mt-6 pt-4 border-t border-gray-700/50'>
        <div className='text-xs text-gray-400 space-y-1'>
          <div className='flex items-center gap-1'>
            <span className='text-gray-500 font-medium'>Created:</span>
            <span className='text-gray-300'>{formatDate(note.createdAt)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-gray-500 font-medium'>Updated:</span>
            <span className='text-gray-300'>{formatDate(note.updatedAt)}</span>
          </div>
        </div>
        
        <div className='flex gap-2'>
          <button 
            onClick={handleEdit}
            className='p-2.5 text-blue-400 hover:text-white hover:bg-blue-500 rounded-xl transition-all duration-200 hover:scale-110 group shadow-lg hover:shadow-blue-500/25'
            title='Edit note'
          >
            <Edit className='w-4 h-4 group-hover:scale-110 transition-transform' />
          </button>
          <button 
            onClick={handleDelete}
            className='p-2.5 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 hover:scale-110 group shadow-lg hover:shadow-red-500/25'
            title='Delete note'
          >
            <Trash2 className='w-4 h-4 group-hover:scale-110 transition-transform' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard