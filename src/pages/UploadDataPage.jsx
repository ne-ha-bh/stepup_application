// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Typography, TextField } from '@mui/material';

// export default function UploadDataPage() {
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('http://localhost:8000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/dashboard'); // Navigate to /dashboard after upload
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Upload failed. Please try again.');
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Upload Data
//       </Typography>
//       <TextField
//         type="file"
//         onChange={handleFileChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />
//       <Button variant="contained" onClick={handleUpload}>
//         Upload
//       </Button>
//     </Box>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function UploadDataPage() {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUploadedFiles();
      navigate('/dashboard'); // Refresh the list after upload
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_latest_uploads');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  const handleDownload = (fileId) => {
    window.location.href = `http://localhost:8000/download_file/${fileId}`; //Updated api endpoint
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const columns = [
    { field: 'file_name', headerName: 'ScoreSheet Name', width: 250 },
    { field: 'upload_time', headerName: 'Uploaded on', width: 250 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleDownload(params.row.file_id)}>
          Download
        </Button>
      ),
    },
  ];

  const rows = uploadedFiles.map((file) => ({
    ...file,
    id: file.file_id, // DataGrid needs an 'id' field
    action: file.file_id, // just to make renderCell work
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Score Sheet
      </Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Recent Uploads
      </Typography>
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
  );
}