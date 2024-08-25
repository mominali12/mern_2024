import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {

  // user context
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate()

  const [error, setError] = useState(null);

  //Form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  //handle login
  const handleLogin =  async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password)
      //set user context
      setUser({email, posts: []})
      //navigate to dashboard
      navigate("/dashboard")

    } catch (error) {
      setError(error.message)
      console.log(error)
    }
    
  };
  return (
    <section className="card">
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email address"
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          className="input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Login;
