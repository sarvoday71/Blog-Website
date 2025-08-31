import Navbar from "../components/NavBar";
import YourBlogPosts from "../components/YourBlogPosts";

interface YourBlogPostsQuery {
  searchquery: string;
  setSearchquery: (query: string) => void;
}

export default function YourBlogs({
  searchquery,
  setSearchquery,
}: YourBlogPostsQuery) {
  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen">
      <Navbar searchquery={searchquery} setSearchquery={setSearchquery} />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <YourBlogPosts searchquery={searchquery} />
      </main>
    </div>
  );
}
