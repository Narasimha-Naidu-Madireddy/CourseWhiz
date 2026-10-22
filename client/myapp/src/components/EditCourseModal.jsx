import { useState, useEffect } from "react";
import { updateCourse } from "../services/courseService";
import "./EditCourseModal.css";

function EditCourseModal({ course, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourse(course._id, formData);

      alert("Course updated successfully!");

      onUpdated();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Course</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Save Changes
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditCourseModal;