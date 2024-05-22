import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import "./App.css";
import MainPage from "./controllers/MainPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage page="home" />} />
        <Route path="/posts" element={<MainPage page="posts" />} />
        <Route path="/post/:postId" element={<MainPage page="post" />} />
        <Route path="/profile" element={<MainPage page="profile" />} />
        <Route path="/addpost" element={<MainPage page="addpost" />} />
        <Route path="/admin/:section" element={<MainPage page="admin" />}/>
      </Routes>
    </Router>
  );
}

export default App;
