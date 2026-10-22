import { useEffect, useState } from "react";

import "./Courses.css";

import Navbar from "../components/Navbar";
import CourseForm from "../components/CourseForm";
import CourseCard from "../components/CourseCard";

import { getCourses } from "../services/courseService";

function Courses() {
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
    <div className="courses-page">

      <Navbar />

      <main className="courses-content">

        <div className="courses-header">
          <h1>📚 My Courses</h1>

          <p>
            Create and manage all your learning courses.
          </p>
        </div>

        <CourseForm
          onCourseCreated={loadCourses}
        />

        <h2 className="course-title">
          Available Courses
        </h2>

        {courses.length === 0 ? (

  <div className="empty-state">

    <div className="empty-icon">
      📚
    </div>

    <h2>No Courses Yet</h2>

    <p>
      Create your first course and start learning with AI.
    </p>

  </div>

) : (

  <div className="course-grid">

    {courses.map((course) => (
      <CourseCard
        key={course._id}
        course={course}
        onCourseDeleted={loadCourses}
      />
    ))}

  </div>

)}

      </main>

    </div>
  );
}

export default Courses;