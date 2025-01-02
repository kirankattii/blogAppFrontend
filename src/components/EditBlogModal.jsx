import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/context";

const EditBlogModal = ({ isOpen, onClose, blog, backendUrl }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const { token, setUserBlogs } = useContext(AppContext);

  useEffect(() => {
    console.log("Received blog in EditBlogModal:", blog);
    if (blog) {
      setFormData({
        title: blog.heading || "",
        content: blog.news || "",
        image: null,
      });
    }
  }, [blog]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(`Field changed: ${name}`, name === "image" ? files[0] : value); // Debugging

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

    setLoading(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/news/${blog.id}`,
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Blog updated successfully");
      setUserBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blog.id ? response.data.news : b))
      );

      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating blog:", error);
      // toast.error("Error updating blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
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
                  name="content"
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
                  {loading ? "Updating..." : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBlogModal;
