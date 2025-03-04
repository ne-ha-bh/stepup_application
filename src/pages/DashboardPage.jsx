import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [batchId, setBatchId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [status, setStatus] = useState('');
  const [batches, setBatches] = useState([]);
  const [levels, setLevels] = useState([]);
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const batchesResponse = await axios.get('http://localhost:8000/get_batches');
        setBatches(batchesResponse.data);
        const levelsResponse = await axios.get('http://localhost:8000/get_levels');
        setLevels(levelsResponse.data);
        const statusesResponse = await axios.get('http://localhost:8000/get_statuses');
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
    fetchData();
  }, []);
  
  const handleGoToLearnerDetails = () => {
    if (batchId && levelId && status) {
      navigate(`/learner-details?batch=${batchId}&level=${levelId}&status=${status}`);
    } else {
      alert('Please fill in all fields.');
    }
  };
  const handleManageParticipantsClick = () => {
    navigate('/manage-participants');
    };

  const columns = [
    {
      field: 'Batch',
      headerName: 'Batch',
      width: 130,
      headerStyle: { fontWeight: 'bold' },
      renderCell: (params) => (
        <span
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          onClick={() => handleBatchClick(params.row.Batch, params.row.Role)}
        >
          {params.value}
        </span>
      ),
    },
    { field: 'Role', headerName: 'Role', width: 100, headerStyle: { fontWeight: 'bold' } },
    { field: 'Active Users', headerName: 'Active Users', width: 100, headerStyle: { fontWeight: 'bold' }},
    { field: 'L1', headerName: 'L1', width: 100, headerStyle: { fontWeight: 'bold' }},
    { field: 'L2', headerName: 'L2', width: 100, headerStyle: { fontWeight: 'bold' } },
    { field: 'L3', headerName: 'L3', width: 100, headerStyle: { fontWeight: 'bold' }},
    { field: 'L4', headerName: 'L4', width: 100, headerStyle: { fontWeight: 'bold' } },
    { field: 'L5', headerName: 'L5', width: 100, headerStyle: { fontWeight: 'bold' } },
  ];

  const fetchData = async () => {
    try {
      setData([]);
      const response = await axios.get('http://localhost:8000/dashboard');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => `${row.Batch}-${row.Role}`;

  const handleBatchClick = (batch, role) => {
    navigate(`/batch-details?batch=${encodeURIComponent(batch)}&role=${encodeURIComponent(role)}`);
  };
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <Box sx={{ height: 400, width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mb: 3, gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="batch-select-label">Batch</InputLabel>
          <Select
            labelId="batch-select-label"
            id="batch-select"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            size="small"
          >
            {batches.map((batch) => (
              <MenuItem key={batch.batch_id} value={batch.batch_id}>
                {batch.batch_no}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="level-select-label">Level</InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            size="small"
          >
            {levels.map((level) => (
              <MenuItem key={level.level_id} value={level.level_id}>
                {level.level_no}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
          >
            {statuses.map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                {statusOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleGoToLearnerDetails}>
          Go to Learner Details
        </Button>
        <div>
            {/* ... other dashboard content */}
            {role === 'capdev' && (
                <Button variant="contained" onClick={handleManageParticipantsClick}>
                    Manage Learners
                </Button>
            )}
        </div>
        <Button variant="outlined" color="error" onClick={handleLogout} sx={{marginLeft:'10px'}}>
          Logout
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Count of users cleared each level of stepup
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowId={getRowId}
        sx={{
          '--unstable_DataGrid-headWeight': 'bold',
        }}
      />
    </Box>
  );
}