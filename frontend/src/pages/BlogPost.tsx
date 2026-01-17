import PostCard from "../components/PostCard";
import Navbar from "../components/NavBar";

interface BlogProps {
  searchquery: string;
  setSearchquery: (value: string) => void;
}

const BlogPost = ({ searchquery, setSearchquery }: BlogProps) => {
  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen">
      <Navbar searchquery={searchquery} setSearchquery={setSearchquery} />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <PostCard />
      </main>
    </div>
  );
};

export default BlogPost;
