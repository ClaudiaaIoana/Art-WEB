import React, { Fragment, useState, useEffect } from "react";
import "../styles/Small_post.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Simple_post(props) {
    const {id,title,username,  image, last_bid } = props;
    const [liked, setLiked] = useState(props.liked);
    const [likes, setLikes] = useState(props.likes);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        // Function to check if the user is admin
        const checkAuthenticated = async () => {
            console.log("Like "+liked);
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

        checkAuthenticated();
    }, []);

    const toggleLiked = async () => {
        if(isAuthenticated)
        {
            const post={
                postId: id,
            }
                try {
                    const token = localStorage.getItem("token");
                    if(!liked)
                    {
                        await axios.post("http://localhost:4200/api/user/add_favourite", JSON.stringify(post), {
                            headers: {
                                Authorization: `${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                    }
                    else{
                        console.log("Delete from favs");
                        await axios.post("http://localhost:4200/api/user/delete_favourite", JSON.stringify(post), {
                            headers: {
                                Authorization: `${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                    }

                } catch (error) {
                    console.error("Error adding to favs:", error);
                    setIsAuthenticated(false);
                }
                
            //TODO: in baza de date       
            setLiked(!liked);
            setLikes(liked ? likes - 1 : likes + 1);
        }
        else alert("You are not logged in!");
    }

    return (
        <Fragment>
            <div className="bid-card">
            <Link to={`/post/${id}`} className="post-link">
                <img src={image} alt="Bid Item" className="bid-image" />
            </Link>
                <div className="bid-data">
                    <p>
                        <span className="title">{title}</span>
                        <span className="username">{username}</span>
                    </p>
                </div>
                <div className="bid-details">
                    <button className="like-button" onClick={toggleLiked}>
                        {console.log(liked)}
                        {liked ? (
                            <img src="../heart_filled.png" alt="Heart Filled" />
                        ) : (
                            <img src="../heart.png" alt="Heart" />
                        )}
                    </button>
                    <span className="like-count">{likes}</span>
                    <span className="current-bid">Bid: ${last_bid}</span>
                </div>
            </div>
        </Fragment>
    );
}

export default Simple_post;
