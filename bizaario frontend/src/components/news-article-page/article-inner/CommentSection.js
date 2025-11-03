import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Ralph Edwards",
      avatar: "https://via.placeholder.com/40",
      text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras...",
      date: "Aug 19, 2021",
      likes: 5,
      replies: [
        {
          id: 2,
          user: "Ralph Edwards",
          avatar: "https://via.placeholder.com/40",
          text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras...",
          date: "Aug 19, 2021",
          likes: 3,
          replies: []
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePost = () => {
    if (newComment.trim() === "") return;
    const newEntry = {
      id: Date.now(),
      user: "Ralph Edwards",
      avatar: "https://via.placeholder.com/40",
      text: newComment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      likes: 0,
      replies: []
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  const handleLike = (id, list = comments) => {
    const updated = list.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : { ...c, replies: handleLike(id, c.replies) }
    );
    return updated;
  };

  const renderComments = (list, isReply = false) =>
    list.map((c) => (
      <div key={c.id} className={`d-flex mt-3 ${isReply ? "ms-5" : ""}`}>
        <img
          src={c.avatar}
          alt={c.user}
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div className="flex-grow-1">
          <div className="bg-light rounded p-3 shadow-sm">
            <div className="d-flex justify-content-between">
              <strong>{c.user}</strong>
              <small className="text-muted">{c.date}</small>
            </div>
            <p className="mb-2">{c.text}</p>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-sm btn-link text-decoration-none"
                onClick={() => setComments(handleLike(c.id))}
              >
                👍 {c.likes}
              </button>
              <button className="btn btn-sm btn-link text-decoration-none">💬 Reply</button>
            </div>
          </div>
          {c.replies.length > 0 && renderComments(c.replies, true)}
        </div>
      </div>
    ));

  return (
    <div className="container py-5">
      <h4 className="mb-4">Add Comments</h4>

      {/* Input Field */}
      <div className="d-flex mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-warning" onClick={handlePost}>
          Post
        </button>
      </div>

      {/* Comment List */}
      <div>{renderComments(comments)}</div>
    </div>
  );
};

export default CommentSection;
