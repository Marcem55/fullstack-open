import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (e) => {
    const createdBlog = {
      ...newBlog,
      [e.target.name]: e.target.value,
    };

    setNewBlog(createdBlog);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
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
  );
};

export default BlogForm;
