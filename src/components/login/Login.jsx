// import styles from "./Login.module.css";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useCheckAuthor } from "../../hooks/useCheckAuthor";

import { API_URL } from "../../config";

function Login() {
  useCheckAuthor();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function makeLoginAttempt() {
    try {
      const res = await fetch(`${API_URL}/author-api/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        navigate("/");
      }
    } catch (error) {
      console.log("error" + error);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <label>
          Username
          <input type="text" value={username} onChange={updateUsername} />
        </label>
        <label>
          Password
          <input type="text" value={password} onChange={updatePassword} />
        </label>
        <button type="button" onClick={makeLoginAttempt}>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
