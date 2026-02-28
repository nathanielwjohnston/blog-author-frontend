// import styles from "./Comment.module.css";

import { useState } from "react";

function Comment({ comment, commentId, removeComment, editComment }) {
  const [editing, setEditing] = useState(false);

  async function deleteComment() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:3000/author-api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        console.log("comment deleted");
        removeComment(commentId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateComment(e) {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form);
    const newContent = form.querySelector(".comment-content").value;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:3000/author-api/comments/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            content: newContent,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        console.log("comment updated");
        const comment = await res.json();
        editComment(commentId, comment);
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(comment);

  return (
    <>
      {editing ? (
        <form onSubmit={updateComment}>
          <label htmlFor={`edit-content-${commentId}`}>Content</label>
          <input
            id={`edit-content-${commentId}`}
            className="comment-content"
            type="text"
            defaultValue={comment.content}
          />
          <button type="submit">Update comment</button>
        </form>
      ) : (
        <div>
          <h4>{comment.user.username}</h4>
          <p>{comment.content}</p>
          <p>{comment.uploadedAt}</p>
        </div>
      )}

      {!editing && (
        <div>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
          <button onClick={deleteComment}>Delete</button>
        </div>
      )}
    </>
  );
}

export default Comment;
