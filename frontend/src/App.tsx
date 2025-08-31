import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogWriting from "./pages/BlogWriting";
import LandingPage from "./pages/LandingPage";
import YourBlogs from "./pages/YourBlogs";
import Edit from "./pages/Edit";

function App() {
  const [searchquery, setSearchquery] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route
          path="/blogs"
          element={
            <Blog searchquery={searchquery} setSearchquery={setSearchquery} />
          }
        />
        <Route path="/new-story" element={<BlogWriting />} />
        <Route
          path="/your-blogs"
          element={
            <YourBlogs
              searchquery={searchquery}
              setSearchquery={setSearchquery}
            />
          }
        />
        <Route path="/edit-blog/:id" element={<Edit></Edit>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
