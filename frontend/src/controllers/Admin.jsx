import React, { useState, useEffect,useRef }  from 'react';
import '../styles/Admin.css';
import '../styles/MyProfile.css';
import { useNavigate} from "react-router-dom";
import Statistics from './Statistics';
import axios from "axios";

const AdminPage = ({ section }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false); // State to store admin status
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [pending, setPending] = useState([]);

    const searchInputRef = useRef(null);

    useEffect(() => {
        // Function to check if the user is admin
        const checkAdminStatus = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:4200/api/user/isAdmin", {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error("Error while checking admin status:", error);
                setIsAdmin(false);
            }
        };

        const fetchUsers = async () => {
            try {
              const response = await axios.get("http://localhost:4200/api/admin/users", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
              setUsers(response.data);
            } catch (error) {
              console.error("Error fetching posts data:", error);
            }
        };

        const fetchPosts = async () => {
            try {
              const response = await axios.get("http://localhost:4200/api/admin/posts", {
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
              const response = await axios.get("http://localhost:4200/api/admin/pending", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
              setPending(response.data);
            } catch (error) {
              console.error("Error fetching posts data:", error);
            }
        };

        checkAdminStatus(); // Call the function when the component mounts
        fetchUsers();
        fetchPosts();
        fetchPending();
    }, []);

    const handleDeleteUser = async (userId) => {
        const user={
            userId: userId,
        }

        try {
            const response = await axios.post("http://localhost:4200/api/admin/delete_user", user, {
              headers: {
                  Authorization: localStorage.getItem("token")
              }
          });
            console.log(response.data.message);
            setUsers(users.filter(user => user.id !== userId));
          } catch (error) {
            console.error("Error deleting:", error);
          }
    };

    const handleMakeAdmin = async (userId) => {
        const user={
            userId: userId,
        }

        try {
            const response = await axios.post("http://localhost:4200/api/admin/make_user_admin", user, {
              headers: {
                  Authorization: localStorage.getItem("token")
              }
          });
            console.log(response.data.message);
            setUsers(users.map(user => user.id === userId ? { ...user, isAdmin: true } : user));
          } catch (error) {
            console.error("Error updating user:", error);
          }
    };

    const handleDecline = async (postId) => {
        const post={
            postId: postId,
        }

        try {
            const response = await axios.post("http://localhost:4200/api/admin/pending_decline", post, {
              headers: {
                  Authorization: localStorage.getItem("token")
              }
          });
            console.log(response.data.message);
            setPending(pending.filter(post => post.ID !== postId));
          } catch (error) {
            console.error("Error deleting:", error);
          }
    };

    const handleConfirm = async (postId) => {
        const post={
            postId: postId,
        }

        try {
            const response = await axios.post("http://localhost:4200/api/admin/pending_confirm", post, {
              headers: {
                  Authorization: localStorage.getItem("token")
              }
          });
            console.log(response.data.message);
            setPending(pending.filter(post => post.ID !== postId));
          } catch (error) {
            console.error("Error deleting:", error);
          }
    };

    const handleDeletePost = async (postId) => {
        const post={
            postId: postId,
        }

        try {
            const response = await axios.post("http://localhost:4200/api/admin/delete_post", post, {
              headers: {
                  Authorization: localStorage.getItem("token")
              }
          });
            console.log(response.data.message);
            setPosts(posts.filter(post => post.ID !== postId));
          } catch (error) {
            console.error("Error deleting:", error);
          }
    };

    const handleSearchInputFocus = () => {
        // Focus logic from Checkout component
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const Users = () => {
        const [searchText, setSearchText] = useState(''); // State to store the search text

        const handleSearchInputChange = () => {
            // Update the search text state when the input value changes
            setSearchText(searchInputRef.current.value);
        };

        const filteredUsers = users.filter(user => (
            user.username.toLowerCase().includes(searchText.toLowerCase()) || 
            user.email.toLowerCase().includes(searchText.toLowerCase())
        ));
        // Users management component
        return (
            <section className="manage-users">
                <h2>Manage Users</h2>
                <input type="text" placeholder="Search Users"
                    ref={searchInputRef}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchInputFocus}
                />
                <table className='info-table'>
                    <thead>
                        <tr>
                            <th className='idth'>ID</th>
                            <th className='simpleth'>Name</th>
                            <th className='simpleth'>Email</th>
                            <th className='simpleth'>Admin</th>
                            <th className='simpleth'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className='idtd'>{user.id}</td>
                                <td className='simpletd'>{user.username}</td>
                                <td className='simpletd'>{user.email}</td>
                                <td className='simpletd'>{user.isAdmin ? 'Yes' : 'No'}</td>
                                {user.isAdmin ? null : (
                                <td className='simpletd'>
                                        <button className='action-button' onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                        <button className='action-button'onClick={() => handleMakeAdmin(user.id)}>Make Admin</button>
                                </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    };

    const Posts = () => {
        // Posts management component
        const [searchText, setSearchText] = useState(''); // State to store the search text

        const handleSearchInputChange = () => {
            // Update the search text state when the input value changes
            setSearchText(searchInputRef.current.value);
        };

        const filteredPosts = posts.filter(post => (
            post.title.toLowerCase().includes(searchText.toLowerCase()) || 
            post.author.toLowerCase().includes(searchText.toLowerCase())
        ));
        return (
            <section className="manage-auctions">
                <h2>Manage Auctions</h2>
                <input type="text" placeholder="Search Auctions" 
                    ref={searchInputRef}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchInputFocus}
                />
                <table className='info-table'>
                    <thead>
                        <tr>
                            <th className='idth'>ID</th>
                            <th className='simpleth'>Title</th>
                            <th className='simpleth'>Username</th>
                            <th className='simpleth'>Status</th>
                            <th className='simpleth'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map(auction => (
                            <tr key={auction.ID}>
                                <td className='idtd'>{auction.ID}</td>
                                <td className='simpletd'>{auction.title}</td>
                                <td className='simpletd'>{auction.author}</td>
                                <td className='simpletd'>{auction.status}</td>
                                <td className='simpletd'>
                                    <button className='action-button' onClick={() => handleDeletePost(auction.ID)}>Delete</button>
                                    {/* Add more actions as needed */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    };

    const Statistic = () => {
        // Statistics component
        return (
            <div className="statistics">
                <Statistics/>
            </div>
        );
    };

    const Pending = () => {
        const [searchText, setSearchText] = useState(''); // State to store the search text

        const handleSearchInputChange = () => {
            // Update the search text state when the input value changes
            setSearchText(searchInputRef.current.value);
        };

        const filteredPending = pending.filter(post => (
            post.title.toLowerCase().includes(searchText.toLowerCase()) || 
            post.author.toLowerCase().includes(searchText.toLowerCase())
        ));
        // Pending Posts management component
        return (
            <section className="manage-auctions">
                <h2>Manage Auctions</h2>
                <input type="text" placeholder="Search Auctions" 
                    ref={searchInputRef}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchInputFocus}
                />
                <table className='info-table'>
                    <thead>
                        <tr>
                            <th className='idth'>ID</th>
                            <th className='simpleth'>Title</th>
                            <th className='simpleth'>Username</th>
                            <th className='simpleth'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPending.map(auction => (
                            <tr key={auction.ID}>
                                <td className='idtd'>{auction.ID}</td>
                                <td className='simpletd'>{auction.title}</td>
                                <td className='simpletd'>{auction.author}</td>
                                <td className='simpletd'>
                                    <button className='action-button' onClick={() => handleDecline(auction.ID)}>Decline</button>
                                    <button className='action-button' onClick={() => handleConfirm(auction.ID)}>Confirm</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    };

    const NotFound = () => {
        return (
            <div className="not-found">
                <h2>Page Not Found</h2>
            </div>
        );
    };

    const gotoUsers = () =>{
        navigate("/admin/users");
    }

    const gotoPosts = () =>{
        navigate("/admin/posts");
    }

    const gotoStatistics = () =>{
        navigate("/admin/statistics");
    }

    const gotoPending = () =>{
        navigate("/admin/pending");
    }

    return (
        isAdmin ?
        <div className="admin-page">
            <header>
                <h1>Administrator Dashboard</h1>
                {/* Navigation menu */}
            </header>
            <main>
                <div className="navigation-bar">
                    <button
                        className={`nav-button ${section === "users" ? "active" : ""}`}
                        onClick={() => gotoUsers()}
                    >
                        Users
                    </button>
                    <button
                        className={`nav-button ${section === "posts" ? "active" : ""}`}
                        onClick={() => gotoPosts()}
                    >
                        Posts
                    </button>
                    <button
                        className={`nav-button ${section === "pending" ? "active" : ""}`}
                        onClick={() => gotoPending()}
                    >
                        Pending
                    </button>
                    <button
                        className={`nav-button ${section === "statistics" ? "active" : ""}`}
                        onClick={() => gotoStatistics()}
                    >
                        Statistics
                    </button>
                </div>
                {section === "users" && <Users />}
                {section === "posts" && <Posts />}
                {section === "statistics" && <Statistic />}
                {section === "pending" && <Pending />}
                {(section !== "users" && section !== "posts" && section !== "statistics" && section !== "pending") && <NotFound />}
            </main>
        </div>
        : 
        <div><h1>PAGE NOT FOUND</h1></div>
    );
}

export default AdminPage;
