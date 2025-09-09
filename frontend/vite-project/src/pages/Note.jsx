import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import NavBar from '../components/NavBar'

const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNote(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Failed to load note');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      toast.success('Note deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <p className='text-gray-400 text-center text-xl'>Loading note...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className='text-red-400 text-xl mb-4'>{error || 'Note not found'}</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Notes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Notes
          </Link>

          <div className='bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700/50'>
            <div className="flex justify-between items-start mb-6">
              <h1 className='text-3xl font-bold text-white mb-4'>{note.title}</h1>
              
              <div className='flex gap-2'>
                <button 
                  onClick={handleEdit}
                  className='p-2.5 text-blue-400 hover:text-white hover:bg-blue-500 rounded-xl transition-all duration-200 hover:scale-110 group shadow-lg hover:shadow-blue-500/25'
                  title='Edit note'
                >
                  <Edit className='w-5 h-5 group-hover:scale-110 transition-transform' />
                </button>
                <button 
                  onClick={handleDelete}
                  className='p-2.5 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 hover:scale-110 group shadow-lg hover:shadow-red-500/25'
                  title='Delete note'
                >
                  <Trash2 className='w-5 h-5 group-hover:scale-110 transition-transform' />
                </button>
              </div>
            </div>

            <div className='prose prose-invert max-w-none mb-6'>
              <p className='text-gray-300 text-lg leading-relaxed whitespace-pre-wrap'>{note.content}</p>
            </div>

            <div className='flex justify-between items-center pt-6 border-t border-gray-700/50 text-sm text-gray-400'>
              <div>
                <span className='text-gray-500 font-medium'>Created:</span>
                <span className='text-gray-300 ml-2'>{formatDate(note.createdAt)}</span>
              </div>
              <div>
                <span className='text-gray-500 font-medium'>Updated:</span>
                <span className='text-gray-300 ml-2'>{formatDate(note.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note