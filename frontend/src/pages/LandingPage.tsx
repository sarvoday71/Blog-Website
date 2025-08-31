import React from "react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Alice",
    quote:
      "BlogPost helped me reach a wider audience and connect with amazing readers worldwide!",
    avatar: "https://placehold.co/48x48",
  },
  {
    name: "Mark",
    quote:
      "I love the easy-to-use editor and the supportive writing community!",
    avatar: "https://placehold.co/48x48",
  },
];

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536M9 13l6-6M4 21h7a2 2 0 002-2v-7a2 2 0 00-2-2H4a2 2 0 00-2 2v7a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Easy Publishing",
    desc: "Create posts with a powerful, intuitive editor.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2a4 4 0 110-8 4 4 0 010 8zm6 4v-1a3 3 0 00-2.824-2.995M6 17v-1a3 3 0 012.824-2.995"
        />
      </svg>
    ),
    title: "Vibrant Community",
    desc: "Connect and share with writers and readers.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12A9 9 0 113 12a9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.05 6.05A9 9 0 0121.95 6.05M2.05 17.95A9 9 0 0121.95 17.95"
        />
      </svg>
    ),
    title: "Global Reach",
    desc: "Share your stories with the world, instantly.",
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white/90 border border-gray-200 rounded-3xl shadow-2xl p-10 animate-fade-in flex flex-col items-center">
        {/* Hero Section */}
        <img
          src="https://placehold.co/120x120"
          alt="BlogPost Logo"
          className="rounded-full shadow-lg mb-4"
        />
        <h1 className="text-5xl font-black text-gray-900 mb-4 text-center tracking-tight drop-shadow-xl">
          Welcome to <span className="text-blue-600">BlogPost</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl font-medium">
          Discover, write, and share your stories with the world.
          <br className="hidden sm:inline" />
          Join our vibrant community of writers and readers.{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 font-semibold cursor-pointer 
             hover:text-blue-700 hover:underline 
             active:text-blue-900 active:scale-95 transition-all duration-150"
          >
            Start your journey today!
          </span>
        </p>

        {/* Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow-sm"
            >
              <div>{f.icon}</div>
              <h3 className="mt-2 text-lg font-bold text-gray-700">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm text-center mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200 w-full" />

        {/* Testimonials */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          What Our Users Say
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-blue-50 rounded-xl px-6 py-4 shadow text-center w-full sm:w-1/2"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="rounded-full h-10 w-10 mx-auto mb-2 border"
              />
              <div className="italic text-gray-700">"{t.quote}"</div>
              <div className="mt-2 font-semibold text-blue-600">{t.name}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Ready to share your voice?
          </h3>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all tracking-wide mt-2"
          >
            Get Started for Free
          </button>
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} BlogPost. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
