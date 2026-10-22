import { useState } from "react";
import api from "../services/api";
import "./UploadPDF.css";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function UploadPDF({ courseId, onUploadSuccess }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      toast.warning("Please select a PDF file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await api.post(

        `/documents/${courseId}/upload`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }

      );

      onUploadSuccess(response.data.documentId);

      toast.success("PDF uploaded successfully!");

    } catch (error) {

      toast.error(error.response?.data?.message || "Upload failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="upload-card">

      <h2>📄 Upload Study Material</h2>

      <input
        className="file-input"
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
  className="upload-btn"
  onClick={handleUpload}
  disabled={loading}
>
  {loading ? (
    <>
      <ClipLoader
        size={18}
        color="#ffffff"
      />

      <span style={{ marginLeft: "10px" }}>
        Uploading...
      </span>
    </>
  ) : (
    "Upload PDF"
  )}
</button>

    </div>

  );

}

export default UploadPDF;