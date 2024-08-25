import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const handleLogout = () => {
    if (confirm("Confirm Logout?")) {
      setUser({ email: null, posts: [] });
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4 max-w-screen-lg">
          <Link
            title="homepage"
            to="/"
            className="fa-solid fa-house nav-link"
          ></Link>

          {user.email ? (
            <div className="flex items-center gap-2">
              <Link
                title="Create post"
                to="/create"
                className="fa-solid fa-circle-plus nav-link"
              ></Link>
              <Link
                title="Dashboard"
                to="/dashboard"
                className="fa-solid fa-circle-user nav-link"
              ></Link>
              <button
                title="logout"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                title="login"
                to="/login"
                className="fa-solid fa-right-from-bracket nav-link"
              ></Link>
              <Link
                title="register"
                to="/register"
                className="fa-solid fa-user-plus nav-link"
              ></Link>
            </div>
          )}
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
