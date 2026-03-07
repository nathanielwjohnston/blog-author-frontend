// import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import { useCheckAuthor } from "../../hooks/useCheckAuthor";
import { Link } from "react-router";

import { API_URL } from "../../config";
import CondensedPost from "../condensedPost/CondensedPost";

function Home() {
  useCheckAuthor();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/author-api/posts`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (res.ok) {
          const fetchedPosts = await res.json();
          setPosts(fetchedPosts);
        } else {
          throw new Error("Not received");
        }
      } catch (error) {
        console.log("error" + error);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {posts.map((post) => {
        return <CondensedPost key={post.id} post={post} />;
      })}
      <br />
      <Link to="/new-post">Add new post</Link>
    </>
  );
}

export default Home;
