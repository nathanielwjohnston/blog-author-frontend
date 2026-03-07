import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import { API_URL } from "../config";

// Will block any non-authors on whatever component it is called
export function useCheckAuthor() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const checkAuthor = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (location.pathname === "/login") {
          return;
        }
        ("no token and go to login");
        navigate("/login");
      }

      try {
        const res = await fetch(`${API_URL}/author-api/author`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (res.ok) {
          const result = await res.json();
          localStorage.setItem("user", JSON.stringify(result.user));
          return;
        }

        if (location.pathname === "/login") {
          return;
        }
        navigate("/login");
      } catch (error) {
        console.log("error" + error);
        if (location.pathname === "/login") {
          return;
        }
        navigate("/login");
      }
    };

    checkAuthor();
  }, [navigate, location]);
}
