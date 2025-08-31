import Navbar from "../components/NavBar";
import YourBlogPosts from "../components/YourBlogPosts";

export default function YourBlogs() {
  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <YourBlogPosts />
      </main>
    </div>
  );
}
