import { useState } from "react";
import { createCourse } from "../services/courseService";
import "./CourseForm.css";

function CourseForm({ onCourseCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createCourse(formData);

      alert("Course created successfully!");

      setFormData({
        title: "",
        description: "",
      });

      onCourseCreated();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form">
      <h2>Create New Course</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Course Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;