import React, { useState, useEffect } from 'react';
import { TOAST_PREFERENCE } from "../constants";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Note from '../components/Note';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NoteEditModal from '../components/NoteEditModal'; 

const BrowseNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('access');
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes/`,
        config
      );

      setNotes(res.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching notes. Please try again later.");
    }
  };

  const deleteNote = (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: [],
      buttons: [
        {
          label: 'Yes',
          className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
          onClick: async () => {
            try {
              const token = localStorage.getItem('access');
              const config = token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : {};

              const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/notes/delete/${id}/`,
                config
              );

              if (res.status === 200) {
                toast.success("Note removed successfully.", TOAST_PREFERENCE);
              } else {
                toast.error("Error occurred while attempting to delete note.", TOAST_PREFERENCE);
              }
            } catch (err) {
              console.error(err);
              toast.error("An error occurred. Please try again later.", TOAST_PREFERENCE);
            } finally {
              closeUpdateModal();
              fetchNotes();
            };
          },
        },
        {
          label: 'No',
          className: 'bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded',
          onClick: () => { } 
        }
      ]
    });
  };

  const openUpdateModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
    fetchNotes();
  };

  const handleUpdateNote = (updatedNote) => {
    api.put(`/api/notes/update/${updatedNote.id}/`, updatedNote)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Note updated successfully. ", TOAST_PREFERENCE);
        } else {
          toast.error("Error occurred while attempting to update note. ", TOAST_PREFERENCE);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again later.", TOAST_PREFERENCE);
      })
      .finally(() => {
        closeUpdateModal();
        fetchNotes();
      });
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navigation />
      <h1 className='max-w-lg text-center bg-zinc-800 text-2xl font-semibold text-white mb-6 py-2 px-5 mt-10 mx-auto lg:rounded-md sm:rounded-sm'>Browse Notes</h1>

      {/* Search */}
      <div className="relative max-w-lg mx-auto my-10">
        <input
          className="w-full py-2 px-4 border border-gray-300 lg:rounded-md sm:rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 lg:rounded-r-md sm:rounded-r-sm">
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
            />
          </svg>
        </span>
      </div>

      {/* Notes List */}
      <section className="flex flex-wrap gap-20 justify-center items-start min-h-screen mb-20 px-4 sm:px-10 md:px-15 lg:px-20">
        <div className={`grid ${filteredNotes.length > 0 ? 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-7`}>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Note key={note.id} note={note} onDelete={() => deleteNote(note.id)} onUpdate={() => openUpdateModal(note)} />
            ))
          ) : (
            <p className='text-center'>No data found.</p>
          )}
        </div>
      </section>
      <Footer />


      {/* Update Note Modal */}
      {isModalOpen && (
        <NoteEditModal
          note={selectedNote}
          onClose={closeUpdateModal}
          onUpdate={handleUpdateNote}
        />
      )}
      <ToastContainer />
    </div >
  );
};

export default BrowseNotes;
