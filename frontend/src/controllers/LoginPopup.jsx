import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StartStyle.css";
import "../styles/PopUp.css";

function LoginPopup({ isVisible, onClose, gotoRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setError("");
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async () => {
        setError("");
    
        const user = {
            Username: username,
            Password: password,
        };
    
        try {
            const response = await axios.post(
                "http://localhost:4200/api/user/login",
                user
            );
            const token = response.data.token; 
            localStorage.setItem("token", token);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // Use the error message from the server
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };
    

    const HandleSignUp = () => {
        gotoRegister();
        onClose();
    };

    return (
        <Fragment>
            {isVisible && (
                <div className="wrap_box">
                    <button className="close_button" onClick={onClose}>
                        <img src="../../delete.png" alt="Close" />
                    </button>
                    <div className="register_title">Login</div>
                    <div className="input-group">
                        <label style={{ width: "30%" }}>Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="your username"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ width: "30%" }}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={handleInputChange}
                        />
                    </div>

                    {error && <div style={{ color: "red" }}>{error}</div>}

                    <button className="register_button" onClick={handleSubmit}>
                        Sign in
                    </button>
                    <button className="change_button" onClick={HandleSignUp}>
                        Sign up
                    </button>
                </div>
            )}
        </Fragment>
    );
}

export default LoginPopup;
