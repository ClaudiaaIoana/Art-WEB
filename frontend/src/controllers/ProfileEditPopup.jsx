import React, { Fragment, useState ,useEffect} from "react";
import "../styles/StartStyle.css";
import "../styles/PopUp.css";
import axios from "axios";

function ProfileEditPopup({ isVisible, onClose ,id}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
    
        const fetchUserDetails = async () => {
            try {
            const response = await axios.get("http://localhost:4200/api/user/details", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setUsername(response.data.username);
            setFirstname(response.data.fisrtname);
            setLastname(response.data.lastname);
            setEmail(response.data.email);
            console.log(response.data);
            } catch (error) {
            console.error("Error fetching profile data:", error);
            }
        };
    
        fetchUserDetails();
      }, []);

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

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if email matches regex
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }

        setError('');

        const user={
            username:username,
            firstname:firstname,
            lastname:lastname,
            email:email,
        };

        try {
            const response = await axios.post("http://localhost:4200/api/user/modif_details",user, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response.data.message);
            window.location.reload();
            onClose(); 
            } catch (error) {
            console.error("Error fetching profile data:", error);
            }
        
    };

    return (
        <Fragment>
            {isVisible && (
                <div className="wrap_box">
                    <button className="close_button" onClick={onClose}><img src="../../delete.png" alt="Close"/></button>
                    <div className="register_title">Edit profile</div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Username:</label>
                        <input value={username} type="text" id="username" name="username" placeholder="your username" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Email:</label>
                        <input value={email} type="text" id="email" name="email" placeholder="your_email@gmail.com" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Firstname:</label>
                        <input value={firstname} type="text" id="firstname" name="firstname" placeholder="firstname" onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label style={{ width: '30%' }}>Lastname:</label>
                        <input value={lastname} type="text" id="lastname" name="lastname" placeholder="lastname" onChange={handleInputChange} />
                    </div>

                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    <button className="register_button" onClick={handleSubmit}>Make changes</button>
                </div>
            )}
        </Fragment>
    );
}

export default ProfileEditPopup;
