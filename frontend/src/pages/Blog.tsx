import BlogFeed from "../components/BlogFeed";
import Navbar from "../components/NavBar";
import { useState } from "react";

interface BlogProps {
  searchquery: string;
  setSearchquery: (value: string) => void;
}

export default function Blog({ searchquery, setSearchquery }: BlogProps) {
  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen">
      <Navbar searchquery={searchquery} setSearchquery={setSearchquery} />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <BlogFeed searchquery={searchquery} />
      </main>
    </div>
  );
}
