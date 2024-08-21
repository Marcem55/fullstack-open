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

  const sortByLikes = (blogsList) => {
    const orderedByLikes = blogsList.sort((a, b) => b.likes - a.likes);

    setBlogs(orderedByLikes);
  };

  useEffect(() => {
    if (!user) return;
    blogService
      .getAll()
      .then((blogs) => sortByLikes(blogs))
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
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      );
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      blogService.getAll().then((blogs) => sortByLikes(blogs));
    });
  };

  const addLike = async (blog) => {
    try {
      const updatedBlog = await blogService.addLike(blog);
      const newBlogs = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog;
        } else {
          return blog;
        }
      });
      sortByLikes(newBlogs);
    } catch (error) {
      window.scrollTo(0, 0);
      setMessage("Cannot add like, please try again later");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.author}?`
      );
      if (confirm) {
        await blogService.deleteBlog(blogObject.id);
        setMessage(`${blogObject.title} by ${blogObject.author} removed`);
        setMessageType("success");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        const newBlogs = blogs.filter((blog) => blog.id !== blogObject.id);
        sortByLikes(newBlogs);
      }
    } catch (error) {
      window.scrollTo(0, 0);
      if (error.response.data.message.includes("permissions")) {
        setMessage("You don't have permissions to delete this blog");
      } else {
        setMessage("Cannot remove, please try again later");
      }

      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
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
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          deleteBlog={deleteBlog}
          allowDelete={blog.user.username === user.username}
        />
      ))}
    </div>
  );
};

export default App;
