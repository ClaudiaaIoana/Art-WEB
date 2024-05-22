import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Simple_post from "./Small_post";
import "../styles/MyProfile.css"; // Import CSS file for styling
import ProfileEditPopup from "./ProfileEditPopup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyProfile(props) {
  const navigate = useNavigate();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to store admin status
  const [profileData, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [pending, setPending] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [acquisitions, setAcquisitions] = useState([]);
  const [bids, setBids] = useState([]);

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

      const fetchProfileData = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/user/profile", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      const fetchPosts = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/user/posts", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts data:", error);
        }
      };

      const fetchPending = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/user/pending", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setPending(response.data);
        } catch (error) {
          console.error("Error fetching pending data:", error);
        }
      };

      const fetchFavourites = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/user/favourites", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setFavourites(response.data);
        } catch (error) {
          console.error("Error fetching pending data:", error);
        }
      };

      const fetchAcquisitions = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/user/acquisitions", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setAcquisitions(response.data);
        } catch (error) {
          console.error("Error fetching pending data:", error);
        }
      };

      const fetchBids = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/user/bids", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setBids(response.data);
        } catch (error) {
          console.error("Error fetching bids:", error);
        }
      };

      checkAuthenticated(); // Call the function when the component mounts
      fetchProfileData();
      fetchPosts();
      fetchPending();
      fetchFavourites();
      fetchAcquisitions();
      fetchBids();
  }, []);

  const handleEditButtonClick = () => {
    setShowEditPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  const handleAddPost = () => {
    navigate("/addpost")
  };

  // State to track active category
  const [activeCategory, setActiveCategory] = useState("Sales");

  return (
    isAuthenticated ?
    <Fragment>
      {/* Profile Header */}
      <div className="profile-header">
        <img className="profile-img" src={"painter.png"} alt="Profile" />
        <div>
          <h1>{profileData.username}</h1>
          <p className="email">{profileData.email}</p>
        </div>

        {/* Sales and Acquisitions */}
        <div className="sales-acquisitions">
          <div className="sales">
            <p className="large-number">{profileData.sales}</p>
            <div>Sales</div>
          </div>
          <div className="acquisitions">
            <p className="large-number">{profileData.acquisitions}</p>
            <div>Acquisitions</div>
          </div>
        </div>

        {/* Edit Button */}
        <div>
          <button className="edit-button" onClick={handleEditButtonClick}><img src="../resume.png"></img></button>
          <button className="edit-button" onClick={handleAddPost}><img src="../add-post.png"></img></button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="navigation-bar">
        <button
          className={`nav-button ${activeCategory === "Sales" ? "active" : ""}`}
          onClick={() => setActiveCategory("Sales")}
        >
          Sales
        </button>
        <button
          className={`nav-button ${activeCategory === "Favourites" ? "active" : ""}`}
          onClick={() => setActiveCategory("Favourites")}
        >
          Favourites
        </button>
        <button
          className={`nav-button ${activeCategory === "Acquisitions" ? "active" : ""}`}
          onClick={() => setActiveCategory("Acquisitions")}
        >
          Acquisitions
        </button>
        <button
          className={`nav-button ${activeCategory === "Pending" ? "active" : ""}`}
          onClick={() => setActiveCategory("Pending")}
        >
          Pending
        </button>
        <button
          className={`nav-button ${activeCategory === "Bids" ? "active" : ""}`}
          onClick={() => setActiveCategory("Bids")}
        >
          Bids
        </button>
      </div>

      {/* Posts */}
      <div className="bid-card-container">
        {activeCategory=="Sales" && posts.map((post) => (
          <Simple_post
            key={post.ID}
            id={post.ID}
            title={post.title}
            username={post.username}
            liked={post.liked}
            likes={post.likes}
            image={post.image}
            last_bid={post.last_bid}
          />
        ))}
        {console.log(favourites)}
        {activeCategory=="Favourites" && favourites.map((post) => (
          <Simple_post
            key={post.ID}
            id={post.ID}
            title={post.title}
            username={post.username}
            liked={post.liked}
            likes={post.likes}
            image={post.image}
            last_bid={post.last_bid}
          />
        ))}
        {activeCategory=="Acquisitions" && acquisitions.map((post) => (
          <Simple_post
            key={post.ID}
            id={post.ID}
            title={post.title}
            username={post.username}
            liked={post.liked}
            likes={post.likes}
            image={post.image}
            last_bid={post.last_bid}
          />
        ))}

        {activeCategory=="Pending" && pending.map((post) => (
          <Simple_post
            key={post.ID}
            id={post.ID}
            title={post.title}
            username={post.username}
            liked={post.liked}
            likes={post.likes}
            image={post.image}
            last_bid={post.last_bid}
          />
        ))}

          {activeCategory=="Bids" && bids.map((post) => (
          <Simple_post
            key={post.ID}
            id={post.ID}
            title={post.title}
            username={post.username}
            liked={post.liked}
            likes={post.likes}
            image={post.image}
            last_bid={post.last_bid}
          />
        ))}
      </div>
      <ProfileEditPopup isVisible={showEditPopup} onClose={handleClosePopup} id={props.id} />
    </Fragment>
    :
    <Fragment><h1>PAGE NOT FOUND</h1></Fragment>
  );
}

export default MyProfile;
