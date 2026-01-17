import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./loader";

interface Author {
  name: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorid: string;
  isPublished: boolean;
  author: Author;
}
const PostCard: React.FC = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    content: "",
    authorid: "",
    isPublished: false,
    author: { name: "" },
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // call backend and store data in some variable.
  useEffect(() => {
    async function getPost() {
      console.log("Entered inside of getPost method");
      setLoading(true);
      try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(
          `https://backend.sarvodayjadhav17.workers.dev/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: jwtToken,
            },
          },
        );
        setPost(response.data);
        console.log(post);
        console.log("API call became successfull");
      } catch (error) {
        console.log(error);
        alert("Error while fecthing post please try again");
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] py-16 px-2 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/90 border border-gray-200 rounded-3xl shadow-2xl p-0 overflow-hidden animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-600/90 to-blue-400/80 px-10 py-8">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs text-blue-100 uppercase tracking-wider mb-1">
              {loading ? <Loader></Loader> : "Author"}
            </span>
            <h2 className="text-2xl font-bold text-white mb-1">
              {post.author.name}
            </h2>
            <p className="text-blue-100 max-w-md text-sm leading-snug">{}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-blue-100 text-sm font-medium">
            <span className="bg-white/20 px-4 py-2 rounded-full">{}</span>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-5xl font-black text-gray-900 mb-8 mt-10 text-center tracking-tight drop-shadow-xl leading-tight px-6">
          {post.title}
        </h1>
        {/* Content */}
        <div className="px-10 pb-12 mt-2 space-y-7 text-lg text-gray-800 leading-relaxed">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
