import React from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUI from '../components/RateLimitedUI' 
import { useState, useEffect } from 'react'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const[loading, setLoading] = useState(false);

    const handleNoteDeleted = (deletedNoteId) => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== deletedNoteId));
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/notes');
                console.log('Notes data:', response.data);
                setNotes(response.data);
                setLoading(false);
                setIsRateLimited(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                if(error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                }
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);
  return (
    <div>
      <NavBar />
        {isRateLimited && <RateLimitedUI />}

        <div >
            {loading ? (
                <p>Loading notes...</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                    {notes.map((note) => (
                       <NoteCard 
                           key={note._id} 
                           note={note} 
                           onNoteDeleted={handleNoteDeleted}
                       />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default HomePage
