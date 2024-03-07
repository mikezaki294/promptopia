"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  // Session call to grab info for current user
  const { data: session } = useSession();
  const router = useRouter();

  //**State Declarations**/
  const [posts, setPosts] = useState([]);

  //Fetch posts for current user
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      console.log(session?.user);
      fetchPosts();
    }
    // Must watch session?.user for provider reload
  }, [session?.user.id]);

  // Edit a single post created by user
  const handleEdit = async (post) => {
    // router.push(`/update-prompt?id=${post._id}`);
  };

  // Delete a single post created by user
  const handleDelete = async (post) => {
    console.log("trying to delete");
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={`${session?.user.name}'s Profile`}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
