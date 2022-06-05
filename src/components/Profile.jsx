import React from 'react';
import axiosInstance from '../services/axiosInstance';

const Profile = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axiosInstance.get('/blogs').then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <h2>Profile</h2>
      <h2>All Drafts</h2>
    </div>
  );
};

export default Profile;
