import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/usersController";
import { UserContext } from '../../contexts/UserContext'

const Register = () => {

  const navigate = useNavigate()

  // user context
  const {setUser} = useContext(UserContext);

  const [error, setError] = useState(null);

  //Form data state
  const [formData, setformData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await registerUser(
        formData.email,
        formData.password,
        formData.passwordConfirm
      );
      //set user context
      setUser({email: formData.email, posts: []})
      //navigate to dashboard
      navigate("/dashboard")

    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="card">
      <h1 className="title">Register</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email address"
          className="input"
          value={formData.email}
          onChange={(e) => {
            setformData({ ...formData, email: e.target.value });
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          className="input"
          value={formData.password}
          onChange={(e) => {
            setformData({ ...formData, password: e.target.value });
          }}
        ></input>
        <input
          type="password"
          placeholder="confirm password"
          className="input"
          value={formData.passwordConfirm}
          onChange={(e) => {
            setformData({ ...formData, passwordConfirm: e.target.value });
          }}
        ></input>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Register;
