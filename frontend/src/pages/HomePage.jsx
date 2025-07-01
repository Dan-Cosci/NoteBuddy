import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';
import RateLimiteUi from '../components/RateLimiteUi';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import toast from "react-hot-toast";
import api from '../lib/axios';

const HomePage = () => {
  
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async () =>{
      try {
        const res = await api.get("/notes");

        console.log(res.data);

        setNotes(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.error("Error fetching data:" + error);
        if (error.response?.status == 429) {
          setIsRateLimited(true);
        }else{
          toast.error("Failed to load Notes");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();

  },[]);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimiteUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

        {notes.length > 0 &&  !isRateLimited  &&  (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => 
              <NoteCard key={note._id} note={note} setNotes={setNotes} /> 
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default HomePage
