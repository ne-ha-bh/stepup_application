import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const InvitedCandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const columns = [
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Email', headerName: 'Email', width: 300 },
    { field: 'TechStack', headerName: 'Tech Stack', width: 150 },
    { field: 'TotalInvites', headerName: 'Total Invites', width: 150, type: 'number' }
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/invited-candidates', {
          params: {
            batch_no: state?.batchNo,
            level_no: state?.levelNo
          }
        });
        const dataWithIds = response.data.map((row, index) => ({
          ...row,
          id: row.Email || index
        }));
        setCandidates(dataWithIds);
      } catch (error) {
        console.error('Error fetching invited candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [state?.batchNo, state?.levelNo]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Invited Candidates</Typography>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </Box>
      <DataGrid
        rows={candidates}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        autoHeight
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default InvitedCandidatesPage;
