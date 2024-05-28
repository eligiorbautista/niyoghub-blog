import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter((post) => {
      const title =
        typeof post.title === "string" ? post.title.toLowerCase() : "";
      const displayName =
        post.author && typeof post.author.displayName === "string"
          ? post.author.displayName.toLowerCase()
          : "";
      return title.includes(query) || displayName.includes(query);
    });
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="px-4 pt-5 pb-10 lg:pt-10 lg:pb-20">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="w-full max-w-lg p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
