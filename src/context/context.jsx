import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()


const AppContextProvider = (prop) => {
  const [token, setToken] = useState(localStorage.getItem('blogtoken') ? localStorage.getItem('blogtoken') : false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [userData, setUserData] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [userBlogs, setUserBlogs] = useState([])
  const [profileImg, setProfileImg] = useState('')

  const getBlogsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/news')

      if (data.success) {
        const sortedBlogs = data.news.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setBlogs(sortedBlogs);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  const getUserBlogsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/news', {
        headers: {
          Authorization: `${token}`, // Use Bearer
        },
      })
      console.log(data);

      if (data.success) {
        const sortedUserBlogs = data.news.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setUserBlogs(sortedUserBlogs);

        setProfileImg(data?.news?.reportor?.profile[0]); // Assuming the path is correct

        getBlogsData();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  console.log(userBlogs);


  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/profile`, {
        headers: {
          Authorization: `${token}`, // Use Bearer
        },
      });

      console.log("data", data);

      if (data?.success) {

        setUserData(data?.user);
      } else {
        toast.error(data.message);
      }
      console.log("user data", userData);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // const userProfile = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/profile`, {
  //       headers: {
  //         Authorization: `${token}`, // Use Bearer
  //       },
  //     });

  //     // console.log(data);

  //     if (data?.success) {
  //       setUserData(data?.user);
  //     } else {
  //       toast.error(data.message);
  //     }
  //     console.log("user data", userData);

  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };






  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token])





  const value = {
    token, setToken, backendUrl, userData, setUserData, getUserBlogsData, getBlogsData, blogs, userBlogs, profileImg
  }


  return (
    <AppContext.Provider value={value}>{prop.children}</AppContext.Provider>
  )






}


export default AppContextProvider