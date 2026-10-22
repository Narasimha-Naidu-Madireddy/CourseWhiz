import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }

}, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
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

      const data = await registerUser(formData);


      toast.success(data.message);


      setFormData({
        name: "",
        email: "",
        password: "",
      });


      navigate("/");


    } catch(error) {

      toast.error(
  error.response?.data?.message || "Registration Failed"
);

    }

  };


  return (

    <div className="register-page">


      <div className="register-card">


        <div className="register-brand">

          <h1>
            📚 CourseWhiz
          </h1>

          <p>
            Create your AI learning account
          </p>

        </div>



        <form onSubmit={handleSubmit}>


          <div className="input-group">

            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>



          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>



          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>



          <button 
            className="register-btn"
            type="submit"
          >

            Create Account 

          </button>


        </form>



        <p className="login-link">

          Already have an account?

          <span onClick={() => navigate("/")}>
            Login
          </span>

        </p>


      </div>


    </div>

  );

}


export default Register;