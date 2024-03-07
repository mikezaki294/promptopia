"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// Implement search functionality and Tag click

const Feed = () => {
  // **State Initialization**
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setDisplayedPosts(data);
    };

    fetchPosts();
  }, []);

  // **Search Functionality**
  const handleSearchChange = async (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    // filter out posts that do not contain the search text (from posts)
    // post.prompt and post.tag and post.creator.username
    const filtered = posts.filter((post) => {
      const promptMatch = post.prompt.toLowerCase().includes(searchText);
      const usernameMatch = post.creator.username
        .toLowerCase()
        .includes(searchText);
      const tagMatch = post.tag.toLowerCase().includes(searchText);
      return tagMatch || usernameMatch || promptMatch;
    });
    // set displayed posts to the new filtered posts
    setDisplayedPosts(filtered);
  };

  //* Tag Click Functionality */
  const handleTagClick = async (e) => {
    console.log(e);
    setSearchText(e);
    // Same logic as search bar, but only for tagMatch
    const filtered = posts.filter((post) => {
      const tagMatch = post.tag.toLowerCase().includes(e);
      return tagMatch;
    });
    // set displayed posts to the new filtered posts
    setDisplayedPosts(filtered);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={displayedPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
