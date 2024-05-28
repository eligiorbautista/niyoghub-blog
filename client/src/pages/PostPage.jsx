import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { UserContext } from "../components/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostInfo(data);
        const createdAt = parseISO(data.createdAt);
        const elapsedTime = formatDistanceToNow(createdAt, {
          addSuffix: true,
        }).replace("about", "");
        setTimeElapsed(elapsedTime);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8000/post/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          navigate("/");
        } else {
          console.error("Failed to delete post:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (!postInfo) return null;

  return (
    <div className="bg-gray-100 min-h-screen px-2 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          className="mb-5 text-black hover:text-emerald-500 focus:outline-none"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {postInfo.title}
              </h2>
              <div className="text-gray-600 text-sm mb-1 font-semibold">
                by {postInfo.author.displayName}
              </div>
              <div className="text-gray-500 text-xs ml-0.5 mt-4">
                {format(new Date(postInfo.createdAt), "MMM d, yyyy")}
              </div>
              <div className="text-gray-500 text-xs mb-4 mt-1 ml-0.5">
                {format(new Date(postInfo.createdAt), "HH:mm ∙ ")}
                {timeElapsed}
              </div>
              {userInfo && userInfo.id === postInfo.author._id && (
                <div className="flex space-x-2">
                  <button
                    className="flex items-center text-black font-semibold px-1 py-1 text-sm sm:text-base"
                    onClick={() => navigate(`/edit/${id}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                  </button>
                  <button
                    className="flex items-center text-black font-semibold px-1 py-1 text-sm sm:text-base"
                    onClick={handleDelete}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <img
            className="w-full h-72 sm:h-96 object-cover object-center"
            src={`http://localhost:8000/${postInfo.cover}`}
            alt={postInfo.title}
          />
          <div className="p-6">
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
