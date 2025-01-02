import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/context";

const AddBlogModal = ({ isOpen, onClose, backendUrl }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const { token, getBlogsData } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update validation to check for correct field names
    if (!formData.title || !formData.content || !formData.image) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content); // Use "content" instead of "news"
    form.append("image", formData.image);

    try {
      const response = await axios.post(`${backendUrl}/api/news`, form, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Blog created successfully");
      getBlogsData()
      onClose();
      // Clear form fields after successful submission
      setFormData({
        title: "",
        content: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating blog:", error); // Log the error for debugging
      toast.error("Error creating blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Title</label>
                <input
                  type="text"
                  name="title" // Use "title" for the name attribute
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  News Content
                </label>
                <textarea
                  name="content" // Use "content" for the name attribute
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-purple-600 text-white rounded ${loading && "opacity-50"
                    }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Add Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBlogModal;
