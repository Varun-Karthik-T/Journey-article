// Comments.js
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";

export default function Comments({ article_id }) {
  const [commentsData, setComments] = useState([]);
  const [textbox, setTextbox] = useState(false);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post("https://journey-api-eb2a.onrender.com/comments", {
        id: article_id,
      });
      const updatedCommentsData = response.data.map((comment) => ({
        comment_id: comment.comment_id,
        user_id: comment.username,
        text: comment.comment,
      }));
      setComments(updatedCommentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitComment = async () => {
    if (!text.trim()) {
      setError("Please enter a comment");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://journey-api-eb2a.onrender.com/addcomment", {
        article_id: article_id,
        text: text,
      });
      setTextbox(false);
      setLoading(false);
      setText("");
      setError(null);
      fetchData();
    } catch (error) {
      console.error("Error sending comments:", error);
      setError("Error submitting comment");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (article_id) {
      fetchData();
    }
  }, [article_id]);
  

  return (
    <>
      <button
        onClick={() => setTextbox(true)}
        className="inline-flex justify-center w-auto rounded-md my-4 px-4 py-2 bg-primary text-sm font-medium text-white transition duration-200 hover:-translate-y-1 hover:scale-105"
      >
        Comment
      </button>
      {textbox && (
        <div className="flex justify-between items-center my-4">
          <input
            type="text"
            className="w-full mx-4 px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            placeholder="Enter your comment here"
          ></input>
          <button
            onClick={submitComment}
            disabled={loading}
            className="inline-flex justify-center w-auto rounded-md px-4 py-2 bg-primary text-sm font-medium text-white transition duration-200 hover:-translate-y-1 hover:scale-105"
          >
            Submit
          </button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {commentsData.map((comment) => (
          <Comment
            key={comment.comment_id}
            user={comment.user_id}
            text={comment.text}
          />
        ))}
      </div>
    </>
  );
}

