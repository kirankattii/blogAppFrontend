// components/Profile.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/context';

const Profile = () => {
  const { userData, profileImg } = useContext(AppContext);

  if (!userData) {
    return <div>Loading user data...</div>;
  }



  console.log("thisabenj", profileImg);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div>
        {profileImg && <img src={profileImg} alt="Profile" />}
      </div>
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {userData.name}
        </p>
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {userData.email}
        </p>
      </div>


    </div>
  );
};

export default Profile;

