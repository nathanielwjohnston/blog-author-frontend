// import styles from "./Post.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useCheckAuthor } from "../../hooks/useCheckAuthor";

import Comment from "../comment/Comment";
import { API_URL } from "../config";

function Post() {
  useCheckAuthor();

  const location = useLocation();
  const [, postId] = location.pathname.split("posts/");

  const [post, setPost] = useState();
  const [editing, setEditing] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/author-api/posts/${postId}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (res.ok) {
          const fetchedPost = await res.json();
          setPost(fetchedPost);
        } else {
          throw new Error("Not received");
        }
      } catch (error) {
        console.log("error" + error);
      }
    };

    getPost();
  }, [postId]);

  function removeComment(commentId) {
    const newComments = post.comments.filter(
      (comment) => comment.id !== commentId,
    );

    setPost({ ...post, comments: [...newComments] });
  }

  function editComment(commentId, updatedComment) {
    const updatedComments = post.comments.map((comment) => {
      if (comment.id === commentId) {
        return updatedComment;
      } else {
        return comment;
      }
    });

    setPost({ ...post, comments: [...updatedComments] });
  }

  async function updatePost(e) {
    e.preventDefault();
    const form = e.currentTarget;
    let updatedPost = {};
    updatedPost.title = form.querySelector(".post-title").value;
    updatedPost.content = form.querySelector(".post-content").value;
    updatedPost.published = form.querySelector(".post-status").checked;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/author-api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const post = await res.json();
        setPost(post);
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/author-api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!post && <div>Loading...</div>}
      {post && (
        <div>
          {editing ? (
            <>
              <form onSubmit={updatePost}>
                <label>
                  Title:
                  <input
                    className="post-title"
                    type="text"
                    defaultValue={post.title}
                  />
                </label>
                <label>
                  Content:
                  <input
                    className="post-content"
                    type="text"
                    defaultValue={post.content}
                  />
                </label>
                <label>
                  Publish
                  {post.published ? (
                    <input
                      className="post-status"
                      type="checkbox"
                      defaultChecked
                    />
                  ) : (
                    <input className="post-status" type="checkbox" />
                  )}
                </label>
                <button type="submit">Update post</button>
              </form>
            </>
          ) : (
            <>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Pub: {post.uploadedAt}</p>
              <p>By {post.author.user.username}</p>
              {post.published ? <p>Published</p> : <p>Not Published</p>}
            </>
          )}
          {!editing && (
            <div>
              <button
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit Post
              </button>
              <button onClick={deletePost}>Delete Post</button>
            </div>
          )}
          <h4>Comments:</h4>
          {post.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                commentId={comment.id}
                removeComment={removeComment}
                editComment={editComment}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Post;
