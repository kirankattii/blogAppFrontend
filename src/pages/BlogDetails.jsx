import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";

const BlogDetails = () => {
  const { backendUrl } = useContext(AppContext)
  const { id } = useParams(); // Get `id` from route params
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/news/${id}`);
        setBlogData(response.data.news);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the blog details");
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <div className="">
            <img
              src={blogData.reportor.profile}
              alt={blogData.reportor.name}
              className="w-16 h-16 rounded-full border object-contain p-0"
            />
          </div>


          <div>
            <h2 className="text-lg font-semibold text-gray-800">{blogData.reportor.name}</h2>
            <p className="text-sm text-gray-500">
              {new Date(blogData.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Blog Image */}
        <div className="relative">
          <img
            src={blogData.image}
            alt={blogData.heading}
            className="w-full  h-80 object-contain"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4">
            <h1 className="text-xl font-bold">{blogData.heading}</h1>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-6">
          <p className="text-gray-700 text-justify leading-relaxed">
            {blogData.news}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
