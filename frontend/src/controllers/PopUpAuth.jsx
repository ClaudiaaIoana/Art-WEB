import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/PopUp.css";

function PopUpUauth(props) {
    const { isVisible, onClose, username } = props; // Destructure props
    let navigate=useNavigate();

    const HandleEdit =() =>{
        navigate("/profile");
        onClose();
    }

    const HandleSignOut =() =>{
        //localStorage.removeItem('token');
        alert("Signed out");
        localStorage.removeItem('token');
        onClose();
        window.location.reload();
    }
    return (
        <Fragment>
            {isVisible && ( // Render popup only if isVisible prop is true
                <div className="box">
                    <button className="close_button" onClick={onClose}><img src="../../delete.png" alt="Close"/></button>
                    <p className="text">Hello, dear art enthusiast!</p>
                    <button className="main_button" onClick={HandleEdit}>View profile</button>
                    <button className="second_button" onClick={HandleSignOut}>Sign out</button>
                </div>
            )}
        </Fragment>
    );
}

export default PopUpUauth;
