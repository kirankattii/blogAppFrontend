import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import AddBlogModal from "../components/AddBlogModal";

const Home = () => {
  const { blogs, getBlogsData, backendUrl, token, userData
  } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);


  if (!blogs) {
    return <div>Loading  data...</div>;
  }


  const totalPages = Math.ceil(blogs.length / limit);
  const navigate = useNavigate()
  const handlePageChange = async (page) => {
    try {
      setCurrentPage(page);
      await getBlogsData();
    } catch (error) {
      toast.error("Error loading blogs.");
    }
  };

  const startIndex = (currentPage - 1) * limit;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + limit);


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    getBlogsData()
  }, [])




  return (
    <div className="container mx-auto px-4 py-8 w-[70%]">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold mb-6">Our Latest Blogs</h1>

        <button
          onClick={() => token && userData ? setIsModalOpen(true) : navigate('/login')}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        >
          Add New Blog
        </button>
      </div>
      <div className="space-y-8">
        {paginatedBlogs.map((blog) => (
          <div key={blog.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blog.image}
              alt={blog.heading}
              className="w-full h-80  md:w-2/4 object-cover p-2"
            />
            <div className="p-4 md:w-2/3">
              <p className="text-gray-500 text-sm">{new Date(blog.created_at).toLocaleDateString()}</p>
              <h2 className="text-lg font-semibold text-purple-700">{blog.heading}</h2>
              <p className="text-gray-700 mb-4">
                {truncateText(blog.news, 200)}

              </p>
              <button onClick={() => navigate(`/blog/${blog.id}`)} className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <nav>
          <ul className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <AddBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backendUrl={backendUrl}
      />

    </div>
  );
};

export default Home;
