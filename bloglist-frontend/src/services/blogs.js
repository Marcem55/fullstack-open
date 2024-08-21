import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(baseUrl, config);

  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLike = async (blogObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const newBlogObject = {
    ...blogObject,
    likes: blogObject.likes + 1,
    user: blogObject.user.id,
  };

  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    newBlogObject,
    config
  );
  return response.data;
};

export default { getAll, create, addLike, setToken };
