import { useEffect, useState } from "react";

import "./Dashboard.css";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import Footer from "../components/Footer";

import { getCourses } from "../services/courseService";

function Dashboard() {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="dashboard-page">

      <Navbar />

      <div className="dashboard-layout">

        <main className="dashboard-content">

          {/* Hero Section */}

          <section className="dashboard-header">

            <div className="hero-content">

              <h1>Welcome to CourseWhiz 👋</h1>

              <p className="hero-subtitle">
                Your AI-Powered Learning Companion
              </p>

              <p className="hero-text">
                Transform your study materials into AI-powered summaries,
                quizzes, flashcards and answer evaluation to make learning
                faster, smarter and more interactive.
              </p>

              <blockquote className="hero-quote">
                "Learn smarter today, lead the future tomorrow."
              </blockquote>

              <button className="hero-btn">
                🚀 Start Learning
              </button>

            </div>

          </section>

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Dashboard;