import axios from 'axios';
import { ArrowLeftIcon, TrashIcon, LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import { Link, Navigate, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data)
      } catch (error) {
        console.error("Error in getting Note Data:"+error);
        toast.error("Could not get Note");
      } finally {
        setLoading(false);
      }

    }

    fetchNotes();
  },[id]);

  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const handleSaving = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note saved");
      navigate("/");
    } catch (error) {
      console.err("Error saving the note");
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }

  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.err("Error deleting the note");
      toast.error("Failed to delete note");
    }
  };
  
  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className='btn btn-ghost rounded-full'>
              <ArrowLeftIcon />
              back to DashBoard
            </Link>

            <button onClick={handleDelete} className='btn btn-error btn-outline justify-end rounded-full'>
              <TrashIcon className='h-5 w-5' />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100 rounded-3xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <form onSubmit={handleSaving} method="post">

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input 
                    type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={note.title}
                    onChange={(e)=>setNote({...note, title:e.target.value})}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea 
                    type='text'
                    placeholder='Write your note here...'
                    className='textarea textarea-bordered h-32'
                    value={note.content}
                    onChange={(e)=>setNote({...note, content:e.target.value})}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className="btn btn-primary rounded-full" disable={saving}>
                    {saving ? "Saving..." : "Save Note"}
                  </button>
                </div>

              </form> 
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage
