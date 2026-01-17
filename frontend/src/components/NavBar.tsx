import { useNavigate, useLocation } from "react-router-dom";

interface Query {
  searchquery: string;
  setSearchquery: (value: string) => void;
}

const Navbar = ({ searchquery, setSearchquery }: Query) => {
  const navigate = useNavigate();
  const location = useLocation();
  function handleOnclick() {
    localStorage.removeItem("your-posts");
    navigate("/new-story");
  }

  function handleOnclick2() {
    navigate("/your-blogs");
  }

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchquery(e.target.value);
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("your-posts");
    navigate("/signin");
  }
  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-lg sticky top-0 z-50 transition-all">
      <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center rounded-b-2xl bg-white/60 backdrop-blur-md shadow-md">
        {/* Blog Logo/Title */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-3xl font-black text-black tracking-tight drop-shadow-sm">
            Blog
          </span>
          <span className="text-3xl font-black text-blue-600 tracking-tight drop-shadow-sm">
            Post
          </span>
        </div>
        {/* Blog Post Nav Links */}
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 text-lg font-semibold text-gray-700 items-center">
            <li
              className="hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200"
              onClick={() => navigate("/blogs")}
            >
              All Posts
            </li>
            <li
              className="hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200"
              onClick={handleOnclick2}
            >
              Your Blogs
            </li>
          </ul>
          {(location.pathname === "/blogs" ||
            location.pathname === "/your-blogs") && (
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 text-base shadow-sm transition-all w-40 sm:w-56"
                onChange={handleOnchange}
                value={searchquery}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
        {/* Write/Sign In Button */}
        {/* ...existing code... */}
        <button
          onClick={handleOnclick}
          className={`px-7 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-base shadow-xl hover:from-blue-700 hover:to-blue-500 transition-all duration-200 border-2 border-blue-100 hover:border-blue-300 ${
            location.pathname === "/blogs" ? "ml-10" : "ml-6"
          }`}
        >
          Write
        </button>

        <div>
          <button
            className="ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-base shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 border-2 border-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
            title="Sign Out"
            onClick={handleSignOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
