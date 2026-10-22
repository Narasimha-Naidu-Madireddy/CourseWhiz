import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./CourseCard.css";
import { deleteCourse } from "../services/courseService";
import EditCourseModal from "./EditCourseModal";

function CourseCard({ course, onCourseDeleted }) {

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {

      await deleteCourse(course._id);

      toast.success("Course deleted successfully!");

      onCourseDeleted();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete course"
      );

    }

  };

  return (
    <>

      <div className="course-card">

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="course-buttons">

          <button
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            Open
          </button>

          <button
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

      {
        showModal && (
          <EditCourseModal
            course={course}
            onClose={() => setShowModal(false)}
            onUpdated={onCourseDeleted}
          />
        )
      }

    </>
  );
}

export default CourseCard;