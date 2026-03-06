// import styles from "./NewPost.module.css";

import { useRef } from "react";
import { useNavigate } from "react-router";
import { useCheckAuthor } from "../../hooks/useCheckAuthor";

function NewPost() {
  useCheckAuthor();

  const titleInput = useRef("");
  const contentInput = useRef("");
  const statusInput = useRef(null);

  let navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const post = {
        title: titleInput.current.value,
        content: contentInput.current.value,
        published: statusInput.current.checked,
      };

      const res = await fetch(`http://localhost:3000/author-api/posts/`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate("/");
      } else {
        throw new Error("Not received");
      }
    } catch (error) {
      console.log("error" + error);
    }
  }

  // NOTE: This goes for all forms, but I should
  // probably be using controlled components
  // for an actual project.
  // If using uncontrolled, I should be using refs
  // just for future reference
  return (
    <>
      <form onSubmit={createPost}>
        <label>
          Title <input type="text" ref={titleInput} />
        </label>
        <label>
          Content <input type="text" ref={contentInput} />
        </label>
        <label>
          Publish post? <input type="checkbox" ref={statusInput} />
        </label>
        <button type="submit">Create post</button>
      </form>
    </>
  );
}

export default NewPost;
