import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        📚 CourseWhiz
      </div>

      <div className="navbar-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/ai-tools">AI Tools</Link>
      </div>

      <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>
    </nav>
  );
}

export default Navbar;