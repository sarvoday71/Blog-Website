import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

interface Article {
  id: number;
  author: { name: string };
  title: string;
  content: string;
  isPublished: boolean;
}

interface BlogFeedQuery {
  searchquery: string;
}
// Helper function to estimate reading time (average 50 words per minute)
function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 50));
  return `${minutes} min read`;
}

const Client = axios.create({
  baseURL: "http://localhost:8787/api/v1/blog/bulk",
});

const BlogFeed: React.FC<BlogFeedQuery> = ({ searchquery }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      try {
        const jwtToken = localStorage.getItem("token");
        setLoading(true);
        const response = await Client.get("", {
          headers: {
            Authorization: jwtToken,
          },
        });
        setArticles(response.data.posts);

        console.log(articles);
        console.log(typeof articles);
      } catch (error) {
        alert("Error while fetching blog posts.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const title = article.title || "";
    const author = article.author.name || "";
    const content = article.content || "";

    return (
      title.toLowerCase().includes(searchquery.toLowerCase()) ||
      author.toLowerCase().includes(searchquery.toLowerCase()) ||
      content.toLowerCase().includes(searchquery.toLowerCase())
    );
  });

  if (!filteredArticles.length && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] py-16 px-2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            No articles found
          </h1>
          <p className="text-gray-600">
            Try adjusting your search or check back later for new content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen py-20 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-gray-900 mb-14 text-center tracking-tight drop-shadow-xl leading-tight">
          {loading ? <Loader></Loader> : "Discover. Read. Inspire."}
        </h1>

        <div className="space-y-12">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/blog/${article.id}`)}
              className="group bg-white/90 border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-stretch overflow-hidden hover:scale-[1.015]"
            >
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                    <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {article.author.name}
                    </span>
                    <span>·</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-3 hover:underline cursor-pointer transition-colors group-hover:text-blue-700">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 text-lg mb-4 line-clamp-4">
                    {article.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-xs text-gray-400 font-medium">
                    {calculateReadTime(article.content)}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] to-[#f0f4ff] w-40 min-h-full">
                <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="#fff"
                  />
                  <path
                    d="M20 30h20M30 20v20"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogFeed;
