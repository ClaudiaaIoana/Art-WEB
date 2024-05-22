import React, { Fragment, useState, useEffect } from "react";
import "../styles/PostPage.css"; 
import axios from "axios";

function PostPage({ postId }) {
  const [post, setPost] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [bidInput, setBidInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState(false); // Track input error state
  const [expanded, setExpanded] = useState(false); // Track whether the gallery is expanded or not
  const [authenticated, setAuthenticated] = useState(false);
  const [valid,setValid]=useState(false);

  const [images, setImages] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:4200/api/user/authenticate", {
              headers: {
                  Authorization: `${token}`
              }
          });
          setAuthenticated(response.data.authenticated);
      } catch (error) {
          console.error("Error while checking authenticated status:", error);
          setAuthenticated(false);
      }
    };

    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/api/post/details?postId=${postId}`);
        const postData = response.data;

        // Convert endTime string to Date object
        postData.endTime = new Date(postData.endTime);
        setPost(postData);
        console.log(postData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/api/post/images?postId=${postId}`);
        setImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const getValid =async () =>{
      try {
        const response = await axios.get(`http://localhost:4200/api/post/valid?postId=${postId}`);
        setValid(response.data.valid);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    checkAuthenticated();
    fetchPostDetails();
    fetchImages();
    getValid();
  }, [postId]);

  useEffect(() => {
    if (!post) return;

    const updateTimer = () => {
      const currentTime = new Date();
      const timeDifference = post.endTime - currentTime;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}:${minutes}:${seconds}`);
      } else {
        setTimeRemaining("Expired");
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [post]);

  const handleBidInputChange = (e) => {
    const value = e.target.value;
    setBidInput(value);

    if (value && parseInt(value) <= post.lastBid) {
      setInputError(true); // Set input error to true
      setErrorMessage("Your bid must be higher than the last bid.");
    } else {
      setInputError(false); // Set input error to false
      setErrorMessage("");
    }
  };

  const handleInputFocus = () => {
    setInputError(false); // Set input error to false when input is focused
    setErrorMessage("");
  };

  const sendBid = async (postId,price) => {
    const bid={
        postId:postId,
        bid:price,
    }

    if(timeRemaining=="Expired"){
      setInputError(true); // Set input error to false when input is focused
      setErrorMessage("The auction ended!");
      return;
    }

    try {
        const response = await axios.post("http://localhost:4200/api/post/bid", bid, {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      });
        console.log(response.data.message);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting:", error);
      }
  };

  const handleSubmitBid = async () => {
    if (parseInt(bidInput) <= post.lastBid) {
      setInputError(true); // Set input error to true
      setErrorMessage("Your bid must be higher than the last bid.");
    } else if (!authenticated) {
      setInputError(true); // Set input error to true
      setErrorMessage("You can't bid if you are not logged in.");
    } else {
      setInputError(false); // Set input error to false
      setErrorMessage("");

      sendBid(postId,bidInput);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const toggleGallery = () => {
    setExpanded(!expanded);
  };

  return (
    valid ?
    <Fragment>
      <div className="post-page-container">
        <h2>{post.title}</h2>
        {/* Image Gallery */}
        <div className={`image-gallery ${expanded ? "expanded" : ""}`}>
          {images.slice(0, expanded || images.length <= 3 ? images.length : 3).map((image, index) => (
            <img
              key={index}
              src={image.image}
              alt={`Image ${index + 1}`}
              className={index === 0 ? "big-image" : "small-image"}
              onClick={() => window.open(image.image, "_blank")}
            />
          ))}
        </div>
        {(images.length > 3 && !expanded) && (
          <button onClick={toggleGallery} className="expand-button">
            <img src="../down.png" style={{ width: '13px', height: '13px' }} /><span>Expand Gallery</span>
          </button>
        )}
        {expanded && (
          <button onClick={toggleGallery} className="expand-button">
            <img src="../up.png" style={{ width: '11px', height: '11px' }} /><span>Collapse Gallery</span>
          </button>
        )}

        {/* Post Details */}
        <div className="post-details">
          <h3>Posted By: {post.author}</h3>
          <p>Description: {post.description}</p>
          <p>Style: {post.styles}</p>
          <p>Time Remaining: {timeRemaining}</p>
        </div>
        {/* Bid Form */}
        <div className="bid-form">
          <div>
            <h3>Place Your Bid</h3>
            <p>Last Bid: ${post.lastBid} by {post.lastBidder}</p>
            <input
              type="number"
              placeholder={`Place your bid (Must be higher than $${post.lastBid})`}
              value={bidInput}
              onChange={handleBidInputChange}
              onFocus={handleInputFocus}
              className={inputError ? "bid-input-error" : "bid-input"} // Apply conditional class
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button onClick={handleSubmitBid}>Submit Bid</button>
        </div>
      </div>
    </Fragment>

    : 
    <div><h1>PAGE NOT FOUND</h1></div>
  );
}

export default PostPage;
