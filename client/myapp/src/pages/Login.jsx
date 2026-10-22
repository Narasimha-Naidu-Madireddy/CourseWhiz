import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";


import "./Login.css";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }

}, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(error.response?.data?.message || "Login Failed");

    }

  };


  return (

    <div className="login-page">


      <div className="login-card">


        <div className="login-brand">

          <h1>
            📚 CourseWhiz
          </h1>

          <p>
            AI Powered Learning Companion
          </p>

        </div>



        <form onSubmit={handleSubmit}>


          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>



          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>



          <button className="login-btn" type="submit">

            Login 

          </button>



        </form>


        <p className="register-link">

          Don't have an account?

          <span onClick={() => navigate("/register")}>

            Register

          </span>

        </p>


      </div>


    </div>

  );
}


export default Login;