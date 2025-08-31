import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { useNavigate, useParams } from "react-router-dom";

interface BlogPost {
  title: string;
  content: string;
  isPublished: boolean;
}

const EditBlog: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost>({
    title: "",
    content: "",
    isPublished: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function renderPost() {
      try {
        setLoading(true);
        const jwtToken = localStorage.getItem("token");
        const post = await axios.get(
          `http://localhost:8787/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        console.log(post.data);
        setPost({
          title: post.data.title,
          content: post.data.content,
          isPublished: true,
        });
      } catch (error) {
        console.log(error);
        alert("Error while fetching the existing Blogpost");
      } finally {
        setLoading(false);
      }
    }
    renderPost();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const PutData = { ...post, id: id };
      setLoading(true);
      const jwtToken = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8787/api/v1/blog",
        PutData,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      console.log(response.data);
      setSubmitted(true);

      console.log("Submitted post:", post);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.log(error);
      alert("Error while publishing the story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/95 border border-gray-200 rounded-3xl shadow-2xl p-10 animate-fade-in">
        <h1 className="text-4xl font-black text-gray-900 mb-8 text-center tracking-tight drop-shadow-xl">
          Write a New Blog Post
        </h1>
        {loading && <Loader></Loader>}
        {submitted && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-200 text-green-700 rounded-2xl text-center font-medium animate-fade-in">
            Post submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="title"
              className="block font-semibold mb-2 text-gray-700 text-lg"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={post.title}
              onChange={handleChange}
              required
              placeholder="Enter your blog title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base shadow-sm transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block font-semibold mb-2 text-gray-700 text-lg"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              value={post.content}
              onChange={handleChange}
              rows={12}
              required
              placeholder="Write your story here..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base shadow-sm transition-all resize-none"
            />
          </div>
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all tracking-wide"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
