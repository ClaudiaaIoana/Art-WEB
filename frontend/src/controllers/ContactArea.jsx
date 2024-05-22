// ContactArea.jsx
import React, { useState, useRef } from 'react';
import "../styles/ContactArea.css";
import Map from './MapController';
import emailjs from '@emailjs/browser';

const ContactArea = () => {
    const position = [40.7226575, -73.99777805555556];
    const [user_name, setUsername] = useState('');
    const [subject, setSubject] = useState('');
    const [user_email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const form = useRef(null); // Create a ref for the form

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleSubject = (e) => {
        setSubject(e.target.value);
    };

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_2akymxf', 'template_dbu4sls', form.current, {
            publicKey: 'H0v59trOr_KwOBg6m',
          })
          .then(
            (result) => {
              console.log(result.text);
              setUsername('');
              setSubject('');
              setEmail('');
              setMessage('');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );

        e.target.reset();
    };

    return (
        <div className="contact-area">
            <h2>Contact Us</h2>
            <div className="contact-info">
                <h3>You can find us at:</h3>
                <p><img src="../phone-call.png" style={{width: 20}}/> <a href="tel:+40745605597">+40745605597</a></p>
                <p><img src="../gmail.png"/> <a href="mailto:artg8640@gmail.com">artg8640@gmail.com</a></p>
                <p>
                    <img src="../facebook.png" style={{width: 20}}/>
                    <a href="https://www.facebook.com/Pixar" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i> Art Gallery
                    </a>
                </p>
                <p>
                    <img src="../instagram.png" style={{width: 20}}/>
                    <a href="https://www.instagram.com/pixar/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i> art_gallery
                    </a>
                </p>
                <div className="map-container">
                    <p><img src="../placeholder.png" style={{width: 20}}/> 1200 Park Ave, Emeryville, CA 94608, United States</p>
                    <Map position={position} />
                </div>
            </div>
            <div className="form-container">
                <h3>Ask a question:</h3>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="form-input">
                        <label htmlFor="user_name">Name:</label>
                        <input type="text" id="user_name" name="user_name" value={user_name} onChange={handleUsername} required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="user_email">Email:</label>
                        <input type="email" id="user_email" name="user_email" value={user_email} onChange={handleEmailChange} required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" value={subject} onChange={handleSubject} required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={message} onChange={handleMessageChange} required />
                    </div>
                    <button type="submit">Send email</button>
                </form>
            </div>
        </div>
    );
};

export default ContactArea;
