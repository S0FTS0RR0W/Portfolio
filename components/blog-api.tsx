"use client";

import { useEffect, useState } from "react";

interface BlogData {
  name: string;
  description: string;
  url: string;
  posts: {
    totalItems: number;
  };
}

export default function Blog() {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch("/api/blogger");
        if (!res.ok) throw new Error("Failed to fetch blog data");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!blog) return null;

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{blog.name}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {blog.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span>Total Posts: {blog.posts.totalItems}</span>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Blog
        </a>
      </div>
    </div>
  );
}
