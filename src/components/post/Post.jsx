// import styles from "./Post.module.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useCheckAuthor } from "../../hooks/useCheckAuthor";
import Comment from "../comment/Comment";

function Post() {
  useCheckAuthor();

  const location = useLocation();
  const [, postId] = location.pathname.split("posts/");

  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/author-api/posts/${postId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );
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

  return (
    <>
      {!post && <div>Loading...</div>}
      {post && (
        <div>
          {" "}
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Pub: {post.uploadedAt}</p>
          <p>By {post.author.user.username}</p>
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
