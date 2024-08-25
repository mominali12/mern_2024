import { useContext, useState } from "react";
import { createPost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { posts, setPosts } = useContext(PostContext);

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      //create post
      const data = await createPost(title, body);
      //update post context
      setPosts([...posts, data.post]);
      //navigate user to dashboard
      navigate("/dashboard");
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create new post</h1>
      <form onSubmit={handleCreate}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Title"
          autoFocus
        ></input>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          className="input"
          placeholder="Content"
        ></textarea>
        <button className="btn" onClick={handleCreate}>
          Create
        </button>
      </form>
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Create;
