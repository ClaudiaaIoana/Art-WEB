import React, { Fragment, useState, useEffect } from "react";
import Select from 'react-select';
import "../styles/Small_post.css";
import Small_post from "./Small_post";
import axios from "axios";

function Simple_posts() {
    // Simulated backend data
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [originalPosts, setOriginalPosts] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const checkAuthenticated = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return false;
            }
            try {
                const response = await axios.get("http://localhost:4200/api/user/authenticate", {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setIsAuthenticated(response.data.authenticated);
                return response.data.authenticated;
            } catch (error) {
                console.error("Error while checking authenticated status:", error);
                setIsAuthenticated(false);
                return false;
            }
        };

        const fetchPosts = async (authenticated) => {
            try {
                let response;
                if (authenticated) {
                    const token = localStorage.getItem("token");
                    response = await axios.get("http://localhost:4200/api/allposts_u", {
                        headers: {
                            Authorization: `${token}`
                        }
                    });
                } else {
                    response = await axios.get("http://localhost:4200/api/allposts_g");
                }
                setOriginalPosts(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error("Error while fetching posts: ", error);
            }
        };

        const initialize = async () => {
            const authenticated = await checkAuthenticated();
            fetchPosts(authenticated);
        };

        initialize();
    }, []);


    // Options for filtering
    const filterOptions = [
        { value: 'min_price', label: 'Min Price' },
        { value: 'max_price', label: 'Max Price' },
        { value: 'none', label: 'none' }
    ];

    // Options for ordering
    const orderByOptions = [
        { value: 'asc_price', label: 'Ascending by Price' },
        { value: 'desc_price', label: 'Descending by Price' },
        { value: 'asc_title', label: 'Ascending by Title' },
        { value: 'desc_title', label: 'Descending by Title' },
        { value: 'none', label: 'None' }
    ];

    // Function to handle filtering posts
    const handleFilter = (selectedOption) => {
        const value = selectedOption.value;
        switch (value) {
            case 'min_price':
                const minPrice = prompt("Enter minimum price:");
                if (minPrice !== null) {
                    const filteredPosts = originalPosts.filter(post => parseFloat(post.last_bid) >= parseFloat(minPrice));
                    setPosts(filteredPosts);
                }
                break;
            case 'max_price':
                const maxPrice = prompt("Enter maximum price:");
                if (maxPrice !== null) {
                    const filteredPosts = originalPosts.filter(post => parseFloat(post.last_bid) <= parseFloat(maxPrice));
                    setPosts(filteredPosts);
                }
                break;
            case 'none':
                const filteredPosts = originalPosts;
                setPosts(filteredPosts);
                break;
            default:
                break;
        }
    };

    // Function to handle ordering posts
    const handleOrder = (selectedOption) => {
        const value = selectedOption.value;
        switch (value) {
            case 'asc_price':
                setPosts([...posts].sort((a, b) => parseFloat(a.last_bid) - parseFloat(b.last_bid)));
                break;
            case 'desc_price':
                setPosts([...posts].sort((a, b) => parseFloat(b.last_bid) - parseFloat(a.last_bid)));
                break;
            case 'asc_title':
                setPosts([...posts].sort((a, b) => a.title.localeCompare(b.title)));
                break;
            case 'desc_title':
                setPosts([...posts].sort((a, b) => b.title.localeCompare(a.title)));
                break;
            case 'none':
                setPosts(originalPosts);
                break;
            default:
                break;
        }
    };

    // Function to handle searching posts
    const handleSearch = (query) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery === "") {
            setPosts(originalPosts);
        } else {
            const filteredPosts = originalPosts.filter(post => {
                return post.title.toLowerCase().includes(trimmedQuery.toLowerCase()) || post.username.toLowerCase().includes(trimmedQuery.toLowerCase());
            });
            setPosts(filteredPosts);
        }
    };

    return (
        <Fragment>
            {/* Search bar and buttons */}
            <div className="search-bar-container">
                <div className="button-container">
                    <Select
                        options={filterOptions}
                        placeholder="Filter"
                        onChange={handleFilter}
                    />
                    <Select
                        options={orderByOptions}
                        placeholder="Order By"
                        onChange={handleOrder}
                    />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
                </div>
            </div>

            {/* Post cards */}
            <div className="bid-card-container">
                {console.log(posts)}
                {posts.map(post => (
                    <Small_post key={post.ID} id={post.ID} title={post.title} username={post.username} liked={post.liked} likes={post.likes} image={post.image} last_bid={post.last_bid} />
                ))}
            </div>
        </Fragment>
    );
}

export default Simple_posts;
