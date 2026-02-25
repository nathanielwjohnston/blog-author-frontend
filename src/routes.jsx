import App from "./components/app/App.jsx";
import ErrorPage from "./components/errorPage/ErrorPage.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Post from "./components/post/Post.jsx";
import NewPost from "./components/newPost/NewPost.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
    ],
  },
];

export default routes;
