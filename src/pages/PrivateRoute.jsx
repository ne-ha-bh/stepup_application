
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadDataPage from './UploadDataPage';
import ParticipantDetailsPage from './ParticipantDetailsPage';

function ProtectedRoute() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/user_info', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                setUserRole(response.data.role);
                setUserEmail(response.data.email);
                console.log("User Email from user info api:", response.data.email);
            } catch (error) {
                console.error('Error fetching user info:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (userRole === 'learner') {
        console.log("User Email passed to participant page:", userEmail);
        return <ParticipantDetailsPage userEmail={userEmail} />;
    } else if (userRole === 'capdev') {
        return <UploadDataPage />;
    } else {
        return <div>Unauthorized access.</div>;
    }
}

export default ProtectedRoute;