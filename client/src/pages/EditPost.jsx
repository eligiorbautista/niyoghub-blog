import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState('');
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };
  const handleContentChange = (value) => setContent(value);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`).then(res => {
      res.json().then(postInfo => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      })
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file);
    data.set('id', id);

    console.log("Form submitted:", { title, summary, content, file });

    const response = await fetch('http://localhost:8000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })

    if (response.ok) {
      navigate(`/post/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
        <input
          type="text"
          id="summary"
          placeholder="Summary"
          value={summary}
          onChange={handleSummaryChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
        <input
          type="file"
          id="file"
          onChange={handleFileUpload}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <ReactQuill
          ref={quillRef}
          value={content}
          modules={modules}
          onChange={handleContentChange}
          className="bg-white h-64"
        />
      </div>
      <button type="submit" className="w-full mt-10 py-3 bg-gray-800 text-white rounded-md font-semibold text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        Update post
      </button>
    </form>
  )
}

export default EditPost
