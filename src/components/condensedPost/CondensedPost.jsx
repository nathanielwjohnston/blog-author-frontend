// import styles from "./CondensedPost.module.css";

import { Link } from "react-router";

function CondensedPost({ post }) {
  return (
    <>
      <div>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
          {post.published ? (
            <>
              <p>Published</p>
              <p>Pub: {post.uploadedAt}</p>
            </>
          ) : (
            <p>Not published</p>
          )}
          <p></p>
        </Link>
      </div>
    </>
  );
}

export default CondensedPost;
