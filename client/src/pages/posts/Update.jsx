import { useContext, useState } from "react";
import { updatePost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const { posts, setPosts } = useContext(PostContext);

  const navigate = useNavigate();
  const {state} = useLocation();

  const [error, setError] = useState(null);

  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //update post
      const data = await updatePost(state._id, title, body);
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
      <h1 className="title">Update post</h1>
      <form onSubmit={handleUpdate}>
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
        <button className="btn" onClick={handleUpdate}>
          Update
        </button>
      </form>
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Update;
