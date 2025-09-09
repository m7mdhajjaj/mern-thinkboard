import React from 'react'
import { useState } from 'react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axios from 'axios'
import toast from 'react-hot-toast'
const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Creating note:', { title, content });
    setTimeout(() => setLoading(false), 1000);
    try {
        const response = await axios.post('http://localhost:3000/api/notes', { title, content });
        console.log('Note created:', response.data);
        toast.success('Note created successfully!');
        setTitle('');
        setContent('');
    } catch (error) {
        console.error('Error creating note:', error);
        toast.error('Failed to create note. Please try again.');
    }
    setLoading(false);
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Notes
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create New Note</h1>
          <p className="text-gray-400">Write down your thoughts and ideas</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                placeholder="Enter note title..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="12"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                placeholder="Write your note content here..."
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !title.trim() || !content.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Creating...' : 'Create Note'}
              </button>
              
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Title: {title.length} characters</span>
            <span>Content: {content.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage