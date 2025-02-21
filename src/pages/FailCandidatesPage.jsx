import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const FailCandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const columns = [
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Email', headerName: 'Email', width: 300 },
    { field: 'PrimarySkill', headerName: 'Primary Skill', width: 150 },
    { field: 'InvitedForNextLevel', headerName: 'Invited For Next Level', width: 200, renderCell: (params) => params.value } 
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/fail-candidates', {
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
        console.error('Error fetching pass candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [state?.batchNo, state?.levelNo]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Fail Candidates</Typography>
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

export default FailCandidatesPage;
