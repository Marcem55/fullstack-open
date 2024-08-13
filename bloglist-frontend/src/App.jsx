import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage("Logged in successfully");
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage("Wrong credentials");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    setMessage("Logged out successfully");
    setMessageType("success");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleChange = (e) => {
    const createdBlog = {
      ...newBlog,
      [e.target.name]: e.target.value,
    };

    setNewBlog(createdBlog);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setMessage("All fields must be completed");
      setMessageType("warning");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    blogService.create(newBlog).then((returnedBlog) => {
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added!`);
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
    });
  };

  return user === null ? (
    <>
      <Notification message={message} type={messageType} />

      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
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
        <form onSubmit={handleSubmit}>
          Title:{" "}
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={newBlog.title}
          />
          Author:{" "}
          <input
            type="text"
            onChange={handleChange}
            name="author"
            value={newBlog.author}
          />
          URL:{" "}
          <input
            type="text"
            onChange={handleChange}
            name="url"
            value={newBlog.url}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
