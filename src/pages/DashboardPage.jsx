import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({ batch, level }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleColumnClick = (params, route) => {
    const batchNo = params.row.batch_no;
    const levelNo = params.row.level_no;
    const url = `/${route}?batch_no=${encodeURIComponent(batchNo)}&level_no=${encodeURIComponent(levelNo)}`;
    navigate(url, { state: { batchNo, levelNo } });
  };

  const columns = [
    { field: 'batch_no', headerName: 'Batch No', width: 130 },
    { field: 'level_no', headerName: 'Level No', width: 130 },
    { 
      field: 'total_invites', 
      headerName: 'Total Invites', 
      width: 150,
      renderCell: (params) => (
        <div
          style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}
          onClick={() => handleColumnClick(params, 'invited-candidates')}
        >
          {params.value}
        </div>
      )
    },
    { 
      field: 'pass', 
      headerName: 'Pass', 
      width: 120, 
      renderCell: (params) => (
        <div
          style={{ cursor: 'pointer', color: 'green', fontWeight: 'bold', textDecoration: 'underline' }}
          onClick={() => handleColumnClick(params, 'pass-candidates')}
        >
          {params.value}
        </div>
      )
    },
    { 
      field: 'fail', 
      headerName: 'Fail', 
      width: 120, 
      renderCell: (params) => (
        <div
          style={{ cursor: 'pointer', color: 'red', fontWeight: 'bold', textDecoration: 'underline' }}
          onClick={() => handleColumnClick(params, 'fail-candidates')}
        >
          {params.value}
        </div>
      )
    },
    { 
      field: 'in_progress', 
      headerName: 'In Progress', 
      width: 150,
      renderCell: (params) => (
        <div
          style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}
          onClick={() => handleColumnClick(params, 'in-progress-candidate')}
        >
          {params.value}
        </div>
      )
    },
  ];

  const fetchData = async () => {
    try {
      setData([]); 
      const response = await axios.get('http://localhost:8000/dashboard1', {
        params: { batch: batch || null, level: level || null },
      });

      console.log('Response data:', response.data);
      const formattedData = formatData(response.data);
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatData = (data) => {
    const formattedData = [];

    const processLevelData = (levelData, levelKey) => {
      if (!levelData) return;

      levelData[`invite_count_${levelKey}`].forEach((invite) => {
        const batchNo = invite["batch_id__batch_no"] || "Unknown Batch";
        const levelNo = invite["level_id__level_no"] || "Unknown Level";
        const invitedCount = invite.InviteCount || 0;

        const passedCount =
          levelData[`passed_count_${levelKey}`]?.find((item) => item["testresult__batch_id__batch_no"] === batchNo)?.ParticipantCount || 0;
        const failedCount =
          levelData[`failed_count_${levelKey}`]?.find((item) => item["testresult__batch_id__batch_no"] === batchNo)?.ParticipantCount || 0;

        let inProgressCount = 0;
        if (levelKey === "lvl1") {
          inProgressCount =
            levelData[`in_progress_count_${levelKey}`]?.find((item) => item["testresult__batch_id__batch_no"] === batchNo)?.InProgressCount || 0;
        } else {
          inProgressCount =
            levelData[`in_progress_count_${levelKey}`]?.find((item) => item["testresult__batch_id__batch_no"] === batchNo)?.ParticipantCount || 0;
        }

        formattedData.push({
          id: `${batchNo}-${levelNo}`,
          batch_no: batchNo,
          level_no: levelNo,
          total_invites: invitedCount,
          pass: passedCount,
          fail: failedCount,
          in_progress: inProgressCount,
        });
      });
    };

    processLevelData(data.level1, "lvl1");
    processLevelData(data.level2, "lvl2");

    return formattedData;
  };

  useEffect(() => {
    fetchData();
  }, [batch, level]);

  return (
    <Box sx={{ height: 400, width: '100%', p: 2 }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
