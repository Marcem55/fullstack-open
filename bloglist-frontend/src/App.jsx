import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage("Logged in successfully");
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage("Wrong credentials");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!user) return;
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        if (error.message.includes("401")) {
          setUser(null);
          window.localStorage.removeItem("loggedBlogAppUser");
          setMessage("Your session has expired, please login again");
          setMessageType("warning");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
      });
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    setMessage("Logged out successfully");
    setMessageType("success");
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const addBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      setMessage("All fields must be completed");
      setMessageType("warning");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added!`
      );
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  return user === null ? (
    <>
      <Notification message={message} type={messageType} />

      <LoginForm login={handleLogin} />
    </>
  ) : (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={messageType} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        <h3>Create new</h3>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
