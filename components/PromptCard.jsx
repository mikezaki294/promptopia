"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { pathName, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      return setCopied("");
    }, 3000);
  };

  // turn posts into an array to separate them for clicking
  post.tags = post.tag?.split(", ");

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              <Link data={post} href={`/profile/${post.creator._id}`}>
                {post.creator.username}
              </Link>
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex gap-2">
        {post.tags.map((tag, index) => (
          <p
            key={index}
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            {tag}
          </p>
        ))}
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            {" "}
            Edit{" "}
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            {" "}
            Delete{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
