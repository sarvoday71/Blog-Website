import BlogFeed from "../components/BlogFeed";
import Navbar from "../components/NavBar";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface BlogProps {
  searchquery: string;
  setSearchquery: (value: string) => void;
}

const queryClient = new QueryClient();

export default function Blog({ searchquery, setSearchquery }: BlogProps) {
  return (
    <div className="bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] min-h-screen">
      <Navbar searchquery={searchquery} setSearchquery={setSearchquery} />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <QueryClientProvider client={queryClient}>
          <BlogFeed searchquery={searchquery} />
        </QueryClientProvider>
      </main>
    </div>
  );
}
