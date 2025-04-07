import React, { useEffect, useState } from 'react';
import axios from "axios"

const UrlPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');

  async function fetchUrl(){
      try {
        const response = await axios.get("http://localhost:8080/url")
        console.log(response.data)
        setBookmarks(response.data)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    fetchUrl()
  },[])

   async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate input
    if (!title || !url) {
      alert('Title and URL are required');
      return;
    }

    // Create a new bookmark
    const newBookmark = { Title:title, URL:url, Description:description, Category:category };
    const response = await axios.post("http://localhost:8080/url/save", newBookmark);
    console.log(response)

    setBookmarks([...bookmarks, newBookmark]);
    fetchUrl()

    // Reset form fields
    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('Work');
  };
  async function DeleteUrlFun(id){
    try {
        const response = await axios.delete(`http://localhost:8080/url/${id}`)
        console.log('Resource deleted successfully:', response.data);
        fetchUrl()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bookmark Manager</h1>
      
      {/* Form for adding bookmarks */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={styles.input} 
            placeholder="Enter bookmark title"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>URL</label>
          <input 
            type="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            style={styles.input} 
            placeholder="Enter URL"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Description (Optional)</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={styles.textarea} 
            placeholder="Enter description"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            style={styles.input}
          >
            <option value="Work">Work</option>
            <option value="Learning">Learning</option>
            <option value="News">News</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Add Bookmark</button>
      </form>

      {/* Bookmarks List */}
      <div style={styles.bookmarkList}>
        {bookmarks.length === 0 ? (
          <p style={styles.noBookmarks}>No bookmarks added yet!</p>
        ) : (
          bookmarks.map((bookmark, index) => (
            <div key={index} style={styles.bookmark}>
              <h3 style={styles.bookmarkTitle}>{bookmark.title}</h3>
              <p style={styles.bookmarkCategory}>{bookmark.category}</p>
              {bookmark.description && <p style={styles.bookmarkDescription}>{bookmark.description}</p>}
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer" style={styles.bookmarkUrl}>{bookmark.url}</a>
              <button>Edit</button>
              <button onClick={() =>DeleteUrlFun(bookmark._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto 20px auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    height: '100px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  bookmarkList: {
    marginTop: '20px',
  },
  noBookmarks: {
    textAlign: 'center',
    color: '#888',
  },
  bookmark: {
    display:"flex",
    gap:"5px",
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  bookmarkTitle: {
    fontSize: '20px',
    marginBottom: '5px',
  },
  bookmarkCategory: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  bookmarkUrl: {
    display: 'block',
    color: '#007bff',
    textDecoration: 'none',
    marginBottom: '10px',
  },
  bookmarkDescription: {
    fontSize: '14px',
    color: '#666',
  },
};

export default UrlPage;
