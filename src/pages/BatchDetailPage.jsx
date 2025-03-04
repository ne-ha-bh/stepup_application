import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function BatchDetailsPage() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const batch = searchParams.get('batch');
  const role = searchParams.get('role');
  const navigate = useNavigate();

  const columns = [
    { field: 'Level', headerName: 'Level', width: 150 },
    { field: 'RolledOut', headerName: 'Rolled Out', width: 150 },
    { field: 'Pass', headerName: 'Pass', width: 150 },
    { field: 'Fail', headerName: 'Fail', width: 150 },
    { field: 'InProgress', headerName: 'In Progress', width: 150 },
    { field: 'YetToInvite', headerName: 'Yet to Invite for next level', width: 200 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/batch_role?batch=${batch}&role=${role}`);
      const apiData = response.data;
      if (apiData && apiData.batch_summary && apiData.batch_summary.Roles && apiData.batch_summary.Roles.length > 0) {
        const roles = apiData.batch_summary.Roles;
        const roleData = roles.find((r) => r.Role === role);
        if (roleData && roleData.Levels) {
          const transformedData = roleData.Levels.map((level, index) => ({
            id: index,
            Level: level.Level,
            RolledOut: level['Rolled Out'],
            Pass: level.Pass,
            Fail: level.Fail,
            InProgress: level['In progress'],
            YetToInvite: level['Yet to Invite for next level'],
          }));
          setData(transformedData);
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  useEffect(() => {
    if (batch && role) {
      fetchData();
    }
  }, [batch, role]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ height: 600, width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Batch: {batch} || Role: {role}
      </Typography>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2, backgroundColor: '#1565c0', color: 'Black' }}>
        Back 
      </Button>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        sx={{
          '--unstable_DataGrid-headWeight': 'bold',
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
