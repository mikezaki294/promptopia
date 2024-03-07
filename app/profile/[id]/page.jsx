"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

function ProfilePage(data) {
  const id = data.params.id;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${data.params.id}/posts`);
      const body = await response.json();

      setPosts(body);
    };

    if (data?.params.id) {
      fetchPosts();
    }
    // Must watch data.params for provider reload
  }, [data?.params.id]);

  return (
    <Profile
      name={`Welcome to ${posts[0]?.creator.username}'s profile`}
      desc={""}
      data={posts}
    />
  );
}

export default ProfilePage;
