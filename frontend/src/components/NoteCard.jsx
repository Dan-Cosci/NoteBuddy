import { PenSquareIcon, TrashIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import { formatDate } from '../lib/utils.js';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({note,setNotes}) => {

  const handleDelete = async (e,id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter(note=> note._id !== id));
      toast.success("Successfully deleted note")
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#7c909a]" >

      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className='size-4'/>
            <button className="btn btn-ghost btn-xs text-error rounded-3xl" onClick={(e)=>handleDelete(e,note._id)}>
              <TrashIcon className='size-4' />
            </button>
          </div>
        </div>
      </div>

    </Link>
  );
}

export default NoteCard
