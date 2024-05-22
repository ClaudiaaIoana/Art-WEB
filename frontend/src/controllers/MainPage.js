import React, { useState, useEffect } from "react";
import "../styles/MainPage.css";
import axios from "axios";
import ContactArea from "./ContactArea";
import PopUpUnauth from "./PopUpUnauth";
import PopUpAuth from "./PopUpAuth";
import Home from "./Home";
import Small_posts from "./Small_posts";
import PostPage from "./PostPage";
import { useNavigate, useParams } from "react-router-dom";
import MyProfile from "./MyProfile";
import AddPost from "./AddPost";
import Admin from "./Admin";
import RegisterPopup from "./RegisterPopup";
import LoginPopup from "./LoginPopup";

function MainPage(props) {
    const {page}=props;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("Guest");
    const [showPopUpUnauth, setShowPopUpUnauth] = useState(false);
    const [showPopUpAuth, setShowPopUpAuth] = useState(false);
    const [isAdminUser, setIsAdminUser] = useState(false);
    const navigate = useNavigate();
    const { postId } = useParams();
    const {section } = useParams();
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleShowLoginPopup = () => {
        setShowLoginPopup(true);
    };
    
    const handleCloseLoginPopup = () => {
        setShowLoginPopup(false);
    };

    const handleShowRegisterPopup = () => {
        setShowRegisterPopup(true);
    };
    
    const handleCloseRegisterPopup = () => {
        setShowRegisterPopup(false);
    };


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
        // Send a request to the backend to validate the token
        axios.get("http://localhost:4200/api/user/authenticate", {
            headers: {
            Authorization: `${token}` // Attach token to the request headers
            }
        })
        .then(response => {
            setIsAuthenticated(true);
            setUserName(response.data.user); // Assuming the user info is sent back from the backend
        })
        .catch(error => {
            setIsAuthenticated(false);
            console.error("Authentication failed:", error);
        });
        } else {
        // No token found in local storage, so user is not authenticated
        setIsAuthenticated(false);
        }

        
        if (token) {
            // Send a request to the backend to validate the token
            axios.get("http://localhost:4200/api/user/isAdmin", {
                headers: {
                Authorization: `${token}` // Attach token to the request headers
                }
            })
            .then(response => {
                console.log(`A primit raspuns! ${response.data.isAdmin}`);
                setIsAdminUser(response.data.isAdmin);
            })
            .catch(error => {
                console.error("Error while checking admin status:", error);
                setIsAdminUser(false);
            });
            } else {
                setIsAdminUser(false);
            }

    }, []);

    const handleUserButtonClick = () => {
        if (isAuthenticated) {
            // Show logout/edit profile modal
            console.log("Show logout/edit profile modal");
            setShowPopUpAuth(true);

        } else {
            // Show register/sign in modal
            console.log("Show register/sign in modal");
            setShowPopUpUnauth(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopUpUnauth(false);
        setShowPopUpAuth(false);
    };

    const handleAuctions =() =>{
        navigate("/posts");
    }

    const handleAdmin =() =>{
        navigate("/admin/users");
    }

    const handleHome =() =>{
        navigate("/");
    }

    return (
        <div className="window">
            <div className="main-content">
                <div className="header">
                    <div className="logo">
                        <button className="home_button" onClick={handleHome}>
                            <img src="../../logo.png" alt="Logo" />
                        </button>
                    </div>
                    <div className="user">
                        <button className="simple_button" onClick={handleUserButtonClick}>
                            <img src="../../painter.png" className="user_button" alt="User" />
                        </button>
                    </div>
                </div>
                <div className="navbar">
                    <ul>
                        <li>
                            <button className="nav_button" onClick={handleAuctions}>Auctions</button>
                        </li>
                        {
                        isAdminUser==true && 
                        <li>
                            <button className="nav_button" onClick={handleAdmin}>Admin</button>
                        </li>
                        }
                    </ul>
                </div>
                <div>
                {page === "home" && <Home/> }
                {page==="posts" && <Small_posts/>}
                {page==="post" && postId && <PostPage postId={postId} />}
                {page==="profile" && <MyProfile/>}
                {page==="addpost" && <AddPost/>}
                {page==="admin" && <Admin section={section}/>}
                </div>
                <div>
                    <ContactArea />
                </div>
                <PopUpUnauth isVisible={showPopUpUnauth} onClose={handleClosePopup} showRegisterPopup={handleShowRegisterPopup} showLoginPopup={handleShowLoginPopup} />
                <PopUpAuth isVisible={showPopUpAuth} onClose={handleClosePopup} username={userName}/>
                <RegisterPopup isVisible={showRegisterPopup} onClose={handleCloseRegisterPopup} gotoLogin={handleShowLoginPopup}/>
                <LoginPopup isVisible={showLoginPopup} onClose={handleCloseLoginPopup} gotoRegister={handleShowRegisterPopup}/>
            </div>
        </div>
    );
}

export default MainPage;
