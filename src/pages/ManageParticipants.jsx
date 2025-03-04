// // ManageParticipants.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// function ManageParticipants() {
//     const [action, setAction] = useState('add'); // 'add', 'edit', 'delete'
//     const [participantId, setParticipantId] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [batchId, setBatchId] = useState('');
//     const [levelId, setLevelId] = useState('');
//     const [batches, setBatches] = useState([]);
//     const [levels, setLevels] = useState([]);
//     // ... other state variables

//     useEffect(() => {
//         // Fetch batches and levels
//         const fetchBatches = async () => {
//           const response = await axios.get('http://localhost:8000/get_batches');
//           setBatches(response.data);
//         };
//         const fetchLevels = async () => {
//           const response = await axios.get('http://localhost:8000/get_levels');
//           setLevels(response.data);
//         };
//         fetchBatches();
//         fetchLevels();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8000/manage_participants', {
//                 action,
//                 participant_id: participantId,
//                 name,
//                 email,
//                 batch_id: batchId,
//                 level_id: levelId,
//                 // ... other fields
//             });
//             alert(`Participant ${action}ed successfully`);
//             // Clear form or refresh data
//         } catch (error) {
//             alert(`Error: ${error.response.data.error}`);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <FormControl fullWidth>
//                 <InputLabel id="batch-select-label">Batch</InputLabel>
//                 <Select
//                     labelId="batch-select-label"
//                     id="batch-select"
//                     value={batchId}
//                     onChange={(e) => setBatchId(e.target.value)}
//                     label="Batch"
//                 >
//                     {batches.map((batch) => (
//                         <MenuItem key={batch.batch_id} value={batch.batch_id}>
//                             {batch.batch_no}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <FormControl fullWidth>
//                 <InputLabel id="level-select-label">Level</InputLabel>
//                 <Select
//                     labelId="level-select-label"
//                     id="level-select"
//                     value={levelId}
//                     onChange={(e) => setLevelId(e.target.value)}
//                     label="Level"
//                 >
//                     {levels.map((level) => (
//                         <MenuItem key={level.level_id} value={level.level_id}>
//                             {level.level_no}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
//             <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             {/* ... other form fields */}
//             <Button type="submit" variant="contained" color="primary">{action.charAt(0).toUpperCase() + action.slice(1)} Participant</Button>
//         </form>
//     );
// }

// export default ManageParticipants;

// ManageParticipants.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ManageParticipants() {
  const [action, setAction] = useState('add');
  const [participantId, setParticipantId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batchId, setBatchId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [batches, setBatches] = useState([]);
  const [levels, setLevels] = useState([]);
  const [primarySkill, setPrimarySkill] = useState('');
  const [secondarySkill, setSecondarySkill] = useState('');
  const [role, setRole] = useState('');
  const [stepupStarted, setStepupStarted] = useState('');
  const [deliveryUnit, setDeliveryUnit] = useState('');
  const [projectName, setProjectName] = useState('');
  const [empId, setEmpId] = useState('');
  const [totalExp, setTotalExp] = useState('');
  const [skill, setSkill] = useState('');
  const [designation, setDesignation] = useState('');
  const [projectInvolvement, setProjectInvolvement] = useState('');
  const [invitedForNextLvl, setInvitedForNextLvl] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
//   const [comments, setComments] = useState('');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      const response = await axios.get('http://localhost:8000/get_batches');
      setBatches(response.data);
    };
    const fetchLevels = async () => {
      const response = await axios.get('http://localhost:8000/get_levels');
      setLevels(response.data);
    };
    const fetchParticipants = async () => {
      const response = await axios.get('http://localhost:8000/get_participants');
      setParticipants(response.data);
    };
    fetchBatches();
    fetchLevels();
    fetchParticipants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/manage_participants', {
        action,
        participant_id: participantId,
        name,
        email,
        batch_id: batchId,
        level_id: levelId,
        primary_skill: primarySkill,
        secondary_skill: secondarySkill,
        role,
        stepup_started: stepupStarted,
        delivery_unit: deliveryUnit,
        project_name: projectName,
        emp_id: empId,
        total_exp: totalExp,
        skill,
        designation,
        project_involvement:projectInvolvement,
        invited_for_next_lvl: invitedForNextLvl,
        is_active: isActive,
        is_delete: isDelete,
      });
      alert(`Participant ${action}ed successfully`);
      const response = await axios.get('http://localhost:8000/get_participants');
      setParticipants(response.data);
      clearForm();
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  };

    const clearForm = () => {
        setParticipantId('');
        setName('');
        setEmail('');
        setBatchId('');
        setLevelId('');
        setPrimarySkill('');
        setSecondarySkill('');
        setRole('');
        setStepupStarted('');
        setDeliveryUnit('');
        setProjectName('');
        setEmpId('');
        setTotalExp('');
        setSkill('');
        setDesignation('');
        setProjectInvolvement('');
        setInvitedForNextLvl(false);
        setIsActive(true);
        setIsDelete(false);
        setComments('');
        setAction('add');
    };

    const handleEdit = (row) => {
        setAction('edit');
        setParticipantId(row.participant_id);
        setName(row.name);
        setEmail(row.email);
        setBatchId(row.batch.batch_id);
        setLevelId(row.latest_level_passed.level_id);
        setPrimarySkill(row.primary_skill);
        setSecondarySkill(row.secondary_skill);
        setRole(row.role);
        setStepupStarted(row.stepup_started);
        setDeliveryUnit(row.delivery_unit);
        setProjectName(row.project_name);
        setEmpId(row.emp_id);
        setTotalExp(row.total_exp);
        setSkill(row.skill);
        setDesignation(row.designation);
        setProjectInvolvement(row.project_involvement);
        setInvitedForNextLvl(row.invited_for_next_lvl);
        setIsActive(row.is_active);
        setIsDelete(row.is_delete);
        setComments(row.comments);
    };

    const handleDelete = async (participantId) => {
        try {
            await axios.post('http://localhost:8000/manage_participants', {
                action: 'delete',
                participant_id: participantId,
            });
            alert('Participant deleted successfully');
            const response = await axios.get('http://localhost:8000/get_participants');
            setParticipants(response.data);
        } catch (error) {
            alert(`Error: ${error.response.data.error}`);
        }
    };

  const columns = [
    { field: 'participant_id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'primary_skill', headerName: 'Primary Skill', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEdit(params.row)} />
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.participant_id)} />
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="batch-select-label">Batch</InputLabel>
                <Select labelId="batch-select-label" id="batch-select" value={batchId} onChange={(e) => setBatchId(e.target.value)} label="Batch">
                  {batches.map((batch) => (
                    <MenuItem key={batch.batch_id} value={batch.batch_id}>
                      {batch.batch_no}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="level-select-label">Level</InputLabel>
                <Select labelId="level-select-label" id="level-select" value={levelId} onChange={(e) => setLevelId(e.target.value)} label="Level">
                  {levels.map((level) => (
                    <MenuItem key={level.level_id} value={level.level_id}>
                      {level.level_no}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Primary Skill" fullWidth value={primarySkill} onChange={(e) => setPrimarySkill(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Secondary Skill" fullWidth value={secondarySkill} onChange={(e) => setSecondarySkill(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Role" fullWidth value={role} onChange={(e) => setRole(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="StepUp Started" type="datetime-local" fullWidth value={stepupStarted} onChange={(e) => setStepupStarted(e.target.value)} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Delivery Unit" type="number" fullWidth value={deliveryUnit} onChange={(e) => setDeliveryUnit(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Project Name" fullWidth value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Employee ID" fullWidth value={empId} onChange={(e) => setEmpId(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Total Experience" type="number" fullWidth value={totalExp} onChange={(e) => setTotalExp(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Skill" fullWidth value={skill} onChange={(e) => setSkill(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Designation" fullWidth value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Project Involvement" fullWidth value={projectInvolvement} onChange={(e) => setProjectInvolvement(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel control={<Checkbox checked={invitedForNextLvl} onChange={(e) => setInvitedForNextLvl(e.target.checked)} />} label="Invited for Next Level" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Is Active" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel control={<Checkbox checked={isDelete} onChange={(e) => setIsDelete(e.target.checked)} />} label="Is Deleted" />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField label="Comments" multiline rows={4} fullWidth value={comments} onChange={(e) => setComments(e.target.value)} />
            </Grid> */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">{action.charAt(0).toUpperCase() + action.slice(1)} Participant</Button>
              <Button onClick={clearForm}>Clear</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper sx={{ p: 2, height: 400, width: '100%' }}>
        <DataGrid rows={participants} getRowId={(row) => row.participant_id} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
      </Paper>
    </Box>
  );
}

export default ManageParticipants;