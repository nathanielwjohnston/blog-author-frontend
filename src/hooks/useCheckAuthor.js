import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

// Will block any non-authors on whatever component it is called
export function useCheckAuthor() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const checkAuthor = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (location.pathname === "/login") {
          console.log("no token and return");
          return;
        }
        ("no token and go to login");
        navigate("/login");
      }

      try {
        const res = await fetch("http://localhost:3000/author-api/author", {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (res.ok) {
          console.log("authorised and return to page component");
          const result = await res.json();
          localStorage.setItem("user", JSON.stringify(result.user));
          return;
        }

        if (location.pathname === "/login") {
          console.log("not authorised and return");
          return;
        }
        console.log("not authorised and go back to login");
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
