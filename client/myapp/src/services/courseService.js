import api from "./api";

const getToken = () => localStorage.getItem("token");

export const getCourses = async () => {
  const response = await api.get("/courses", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};