import BlogWrite from "../components/BlogWrite";
import Navbar from "../components/NavBar";

interface BlogProps {
  searchquery: string;
  setSearchquery: (value: string) => void;
}

function BlogWriting({ searchquery, setSearchquery }: BlogProps) {
  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen">
      <Navbar
        searchquery={searchquery}
        setSearchquery={setSearchquery}
      ></Navbar>
      <main className="max-w-6xl mx-auto px-4 py-20">
        <BlogWrite />
      </main>
    </div>
  );
}

export default BlogWriting;
