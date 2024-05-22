import React, { useState, Fragment, useEffect } from 'react';
import Select from 'react-select';
import "../styles/AddPost.css";
import "../styles/StartStyle.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [author, setAuthor] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to store admin status
  const navigate = useNavigate();

  useEffect(() => {
      // Function to check if the user is admin
      const checkAuthenticated = async () => {
          try {
              const token = localStorage.getItem("token");
              const response = await axios.get("http://localhost:4200/api/user/authenticate", {
                  headers: {
                      Authorization: `${token}`
                  }
              });
              setIsAuthenticated(response.data.authenticated);
          } catch (error) {
              console.error("Error while checking authenticated status:", error);
              setIsAuthenticated(false);
          }
      };

      checkAuthenticated(); // Call the function when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const styles = selectedStyles.map(style => style.value).join(', ');

    const formData = {
      title: title,
      selectedStyles:styles,
      author: author,
      startingBid:startingBid,
      description:description,
    }

    var postId=0;

    try {
      var response = await axios.post('http://localhost:4200/api/posts/addpost', formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      postId=response.data.postId;

    
    for (const photo of photos) {
      const photoFormData = new FormData();
      photoFormData.append('photo', photo);

        var response = await fetch("http://localhost:4200/upload", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: photoFormData,
        });
        const data = await response.json();
        console.log(data.image_url);
        const image_url=data.image_url;

        const postImage={
          postID: postId,
          imageURL:image_url,
        }

        response = await axios.post("http://localhost:4200/api/posts/images", postImage );

    }
    
    } catch (error) {
      console.error('Error adding post:', error);
      alert('An error occurred while adding the post.');
    }

    // Reset form fields after submission
    navigate("/profile");
  };

  const styleOptions = [
    { value: 'Impressionism', label: 'Impressionism' },
    { value: 'Abstract', label: 'Abstract' },
    { value: 'Realism', label: 'Realism' },
    { value: 'Cubic', label: 'Cubic' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Minimalism', label: 'Minimalism' },
    { value: 'Renesance', label: 'Renesance' },
    // Add more options as needed
  ];

  const handleStyleChange = (selectedOptions) => {
    setSelectedStyles(selectedOptions || []);
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    // Here you can handle file uploads and store them in the state
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    isAuthenticated ?
    <Fragment>
      <div className="add-post">
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="styles">Styles</label>
            <Select
              id="styles"
              options={styleOptions}
              isMulti
              value={selectedStyles}
              onChange={handleStyleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startingBid">Starting Bid</label>
            <input
              type="number"
              id="startingBid"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
          <label>Photos</label>
          <div>
            <label htmlFor="photos" className="add-photo-label">
              <img src="../image-gallery.png" alt="Add Photo"/>
              <input
                type="file"
                id="photos"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                required
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="photo-thumbnails-container">
            {photos.map((photo, index) => (
              <div key={index} className="photo-thumbnail-container">
                <img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} className="photo-thumbnail" />
                <button type="button" onClick={() => handleRemovePhoto(index)} className="remove-photo-button">
                x
                </button>
              </div>
            ))}
          </div>
        </div>
          <button type="submit" className="register_button">Submit</button>
        </form>
      </div>
    </Fragment>
    :
    <Fragment><h1>PAGE NOT FOUND</h1></Fragment>
  );
};

export default AddPost;
