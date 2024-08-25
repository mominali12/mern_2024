/********************** get posts **********************/

const getPosts = async () => {
  const res = await fetch("/api/posts");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/********************** get user posts **********************/
const getUserPosts = async () => {
  const res = await fetch("/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/********************** create post **********************/
const createPost = async (title, body) => {
  if (!title || !body) {
    throw Error("All fields are required");
  }

  const res = await fetch("/api/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({title, body})
  });

  const data = await res.json()

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/********************** delete post **********************/
const deletePost = async (_id) => {
  const res = await fetch(`/api/posts/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json()

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/********************** update post **********************/
const updatePost = async (_id, title, body) => {

  if (!title || !body) {
    throw Error("All fields are required");
  }

  const res = await fetch(`/api/posts/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({title, body})
  });

  const data = await res.json()

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

export { getPosts, getUserPosts, createPost, deletePost, updatePost };
