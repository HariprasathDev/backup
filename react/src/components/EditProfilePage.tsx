// src/pages/EditProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/EditProfilePage.css';

const EditProfilePage: React.FC = () => {
  const { ContentId } = useParams<{ ContentId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshData = location.state?.refreshData;
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const desiredFields = [
    'ProfileId',
    'Gender',
    'Mobile_no',
    'EmailId',
    'Profile_marital_status',
    'Profile_dob',
    'Profile_complexion',
    'Profile_address',
    'Profile_country',
    'Profile_state',
    'Profile_city',
    'Profile_pincode',
  ];

  useEffect(() => {
    if (!ContentId) {
      console.error('ContentId is undefined');
      setError('ContentId is undefined');
      setLoading(false);
      return;
    }

    console.log('Fetching profile for ContentId:', ContentId);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/logindetails/${ContentId}/`);
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [ContentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/logindetails/${ContentId}/`, profile);
      if (refreshData) {
        refreshData();
      }
      navigate('/admin'); 
    } catch (error) {
      setError('Error saving profile data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <div className="form-container">
        {profile && desiredFields.map(key => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              name={key}
              type="text"
              value={profile[key] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="button">
        <button onClick={handleSave} className="btn btn-primary">Save</button>
        <button onClick={() => navigate('/admin')} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default EditProfilePage;
