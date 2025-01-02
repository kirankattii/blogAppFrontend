import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import AddBlogModal from "../components/AddBlogModal";
import EditBlogModal from "../components/EditBlogModal.jsx" // Assuming you will create this component
import { Pencil, Trash2 } from 'lucide-react';


const MyBlogs = () => {
  const { userBlogs, backendUrl, setUserBlogs, token, userData, getUserBlogsData, getBlogsData } = useContext(AppContext); // Add setUserBlogs 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit modal
  const [selectedBlog, setSelectedBlog] = useState(null); // To store the blog to edit
  const navigate = useNavigate();

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`${backendUrl}/api/news/${blogId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token, // Assuming you store the token in localStorage
          },
        });
        getUserBlogsData();

        if (response.ok) {
          toast.success('Blog deleted successfully!');
          setUserBlogs(userBlogs.filter(blog => blog.id !== blogId));
          getUserBlogsData();
        } else {
          // toast.error('Error deleting blog.');
          console.log("Error deleting blog:", response.statusText);

        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        // toast.error('Error deleting blog.');
      }
    }
  };

  useEffect(() => {
    getUserBlogsData()
  }, [token])



  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };


  return (
    <div className="container mx-auto px-4 py-8 w-[70%]">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold mb-6">Your Latest Blogs</h1>
        <button
          onClick={() => token && userData ? setIsModalOpen(true) : navigate('/login')}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        >
          Add New Blog
        </button>
      </div>
      <div className="space-y-8">
        {userBlogs.length > 0 && userBlogs.map((blog) => (
          <div key={blog.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blog.image}
              alt={blog.heading}
              className="w-full h-80  md:w-2/4 object-cover p-2"
            />
            <div className="p-4 flex flex-col justify-between md:w-2/3">
              <div>
                <p className="text-gray-500 text-sm">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <h2 className="text-lg font-semibold text-purple-700">
                  {blog.heading}
                </h2>
                <p className="text-gray-700 mb-4">
                  {truncateText(blog.news, 200)}
                </p>
                <div className="flex space-x-2 flex-col justify-between ">
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                  >
                    Read more →
                  </button>
                </div>
              </div>
              <div className=" flex items-center  space-x-2  justify-end mt-6">
                <button
                  onClick={() => {
                    console.log("Selected blog for editing:", blog);
                    setSelectedBlog(blog);
                    setIsEditModalOpen(true);
                  }}
                  className="text-white rounded-full bg-purple-600 hover:bg-purple-700 "
                >
                  <Pencil className="md:w-8 h-8 p-1 rounded-full font-bold text-white" />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-white rounded-full bg-purple-600 hover:bg-purple-700 "
                >
                  <Trash2 className="w-8 h-8 font-bold p-1 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backendUrl={backendUrl}
      />
      {/* Edit Blog Modal */}
      {selectedBlog && (
        <EditBlogModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          blog={selectedBlog}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
};

export default MyBlogs;

