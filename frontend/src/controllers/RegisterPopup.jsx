import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StartStyle.css";
import "../styles/PopUp.css";

function RegisterPopup({ isVisible, onClose, gotoLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !firstname || !lastname || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const user = {
            Username: username,
            Password: password,
            Email: email,
            Firstname: firstname,
            Lastname: lastname,
            Type: 1
        };
    
        try {
            await axios.post('http://localhost:4200/api/user/register', JSON.stringify(user), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("Registration successful!");
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    
       

        onClose(); // Close the popup after submission
    };

    const HandleSignIn = () => {
        gotoLogin();
        onClose();
    };

    return (
        <Fragment>
            {isVisible && (
                <div className="wrap_box">
                    <button className="close_button" onClick={onClose}><img src="../../delete.png" alt="Close"/></button>
                    <div className="register_title">Register</div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Username:</label>
                        <input type="text" id="username" name="username" placeholder="your username" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Email:</label>
                        <input type="text" id="email" name="email" placeholder="your_email@gmail.com" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Firstname:</label>
                        <input type="text" id="firstname" name="firstname" placeholder="firstname" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Lastname:</label>
                        <input type="text" id="lastname" name="lastname" placeholder="lastname" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Password:</label>
                        <input type="password" id="password" name="password" placeholder="password" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Confirm:</label>
                        <input type="password" id="conf_password" name="confirmPassword" placeholder="confirm password" onChange={handleInputChange} />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button className="register_button" onClick={handleSubmit}>Sign up</button>
                    <button className="change_button" onClick={HandleSignIn}> Sign in</button>
                </div>
            )}
        </Fragment>
    );
}

export default RegisterPopup;
