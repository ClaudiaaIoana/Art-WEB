import React, { Fragment } from "react";
import "../styles/PopUp.css";

function PopUpUnauth(props) {
    const { isVisible, onClose,showRegisterPopup,showLoginPopup } = props; // Destructure props

    const HandleSignIn =() =>{
        //navigate("/login");
        showLoginPopup();
        onClose();
    }

    const HandleSignUp =() =>{
        //navigate("/register");
        showRegisterPopup();
        onClose();
    }
    return (
        <Fragment>
            {isVisible && ( // Render popup only if isVisible prop is true
                <div className="box">
                    <button className="close_button" onClick={onClose}><img src="../../delete.png" alt="Close"/></button>
                    <p className="text">You are not logged in, do you want to sign in?</p>
                    <button className="main_button" onClick={HandleSignIn}>Sign in</button>
                    <button className="second_button" onClick={HandleSignUp}>Sign up</button>
                </div>
            )}
        </Fragment>
    );
}

export default PopUpUnauth;
