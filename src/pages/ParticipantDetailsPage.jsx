// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import axios from 'axios';

// function ParticipantDetailsPage() {
//     const [participantData, setParticipantData] = useState(null);
//     const [participantId, setParticipantId] = useState('');
//     const [comments, setComments] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`/participant_data?participant_id=${participantId}`);
//             setParticipantData(response.data);
//         } catch (err) {
//             setError(err.message || 'Failed to fetch data');
//             setParticipantData(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const sendComments = async () => {
//       setLoading(true);
//       setError(null);
//         try {
//             await axios.post('http://127.0.0.1:8000/send_query', {
//                 participant_id: participantId,
//                 comments: comments,
//             });
//             alert('Comments sent successfully!');
//             setComments('');
//         } catch (err) {
//             setError(err.message || 'Failed to send comments');
//         } finally {
//           setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (participantId) {
//             fetchData();
//         }
//     }, [participantId]);

//     const renderLevelData = (levelData, levelName) => {
//         if (!levelData || Object.keys(levelData).length === 0) {
//             return <Typography>No data for {levelName}</Typography>;
//         }

//         const rows = levelData['Primary Tech Stack'].map((tech, index) => ({
//             id: index,
//             tech: tech,
//             status: levelData['Status'][index],
//             invites: levelData['# of invites'][index],
//             lastInvited: levelData['Last invited on'][index],
//         }));

//         const columns = [
//             { field: 'tech', headerName: 'Primary Tech Stack', flex: 1 },
//             { field: 'status', headerName: 'Status', flex: 1 },
//             { field: 'invites', headerName: '# of invites', flex: 1 },
//             { field: 'lastInvited', headerName: 'Last invited on', flex: 1 },
//         ];

//         return (
//             <Box mt={2}>
//                 <Typography variant="h6">{levelName}</Typography>
//                 <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick />
//             </Box>
//         );
//     };

//     if (loading) return <Typography>Loading...</Typography>;
//     if (error) return <Typography color="error">{error}</Typography>;

//     return (
//         <Box p={3}>
//             <TextField
//                 label="Participant ID"
//                 value={participantId}
//                 onChange={(e) => setParticipantId(e.target.value)}
//                 margin="normal"
//             />
//             {participantData && (
//                 <Box mt={2}>
//                     <Typography variant="h5">Participant Details</Typography>
//                     <Typography>Name: {participantData['Name of the learner']}</Typography>
//                     <Typography>StepUp started on: {participantData['StepUp started on']}</Typography>
//                     <Typography>Designation: {participantData.Designation}</Typography>
//                     <Typography>Email ID: {participantData['Email ID']}</Typography>
//                     <Typography>Batch No: {participantData['Batch No']}</Typography>
//                     <Typography>Role: {participantData.Role}</Typography>

//                     {Object.keys(participantData)
//                         .filter((key) => key.startsWith('Level'))
//                         .map((levelKey) => renderLevelData(participantData[levelKey], levelKey))}
//                 </Box>
//             )}

//             <Box mt={3}>
//                 <TextField
//                     label="Comments"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     value={comments}
//                     onChange={(e) => setComments(e.target.value)}
//                 />
//                 <Button variant="contained" color="primary" onClick={sendComments} mt={2}>
//                     Submit
//                 </Button>
//             </Box>
//         </Box>
//     );
// }

// export default ParticipantDetailsPage;

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import axios from 'axios';

// function ParticipantDetailsPage({ userEmail }) {
//     console.log("ParticipantDetailsPage userEmail:", userEmail);

//     const [participantData, setParticipantData] = useState(null);
//     const [comments, setComments] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`http://localhost:8000/participant_data?email=${userEmail}`);
//             setParticipantData(response.data);
//         } catch (err) {
//             setError(err.message || 'Failed to fetch data');
//             setParticipantData(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const sendComments = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             await axios.post('http://localhost:8000/send_query', {
//                 email: userEmail, // Send email instead of participant_id
//                 comments: comments,
//             });
//             alert('Comments sent successfully!');
//             setComments('');
//         } catch (err) {
//             setError(err.message || 'Failed to send comments');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (userEmail) {
//             fetchData();
//         }
//     }, [userEmail]);

//     const renderLevelData = (levelData, levelName) => {
//         if (!levelData || Object.keys(levelData).length === 0) {
//             return <Typography>No data for {levelName}</Typography>;
//         }

//         const rows = levelData['Primary Tech Stack'].map((tech, index) => ({
//             id: index,
//             tech: tech,
//             status: levelData['Status'][index],
//             invites: levelData['# of invites'][index],
//             lastInvited: levelData['Last invited on'][index],
//         }));

//         const columns = [
//             { field: 'tech', headerName: 'Primary Tech Stack', flex: 1 },
//             { field: 'status', headerName: 'Status', flex: 1 },
//             { field: 'invites', headerName: '# of invites', flex: 1 },
//             { field: 'lastInvited', headerName: 'Last invited on', flex: 1 },
//         ];

//         return (
//             <Box mt={2}>
//                 <Typography variant="h6">{levelName}</Typography>
//                 <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick />
//             </Box>
//         );
//     };

//     if (loading) return <Typography>Loading...</Typography>;
//     if (error) return <Typography color="error">{error}</Typography>;

//     return (
//         <Box p={3}>
//             {participantData && (
//                 <Box mt={2}>
//                     <Typography variant="h5">Participant Details</Typography>
//                     <Typography>Name: {participantData['Name of the learner']}</Typography>
//                     <Typography>StepUp started on: {participantData['StepUp started on']}</Typography>
//                     <Typography>Designation: {participantData.Designation}</Typography>
//                     <Typography>Email ID: {participantData['Email ID']}</Typography>
//                     <Typography>Batch No: {participantData['Batch No']}</Typography>
//                     <Typography>Role: {participantData.Role}</Typography>

//                     {Object.keys(participantData)
//                         .filter((key) => key.startsWith('Level'))
//                         .map((levelKey) => renderLevelData(participantData[levelKey], levelKey))}
//                 </Box>
//             )}

//             <Box mt={3}>
//                 <TextField
//                     label="Comments"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     value={comments}
//                     onChange={(e) => setComments(e.target.value)}
//                 />
//                 <Button variant="contained" color="primary" onClick={sendComments} mt={2}>
//                     Submit
//                 </Button>
//             </Box>
//         </Box>
//     );
// }

// export default ParticipantDetailsPage;




import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function ParticipantDetailsPage() {

    const [participantData, setParticipantData] = useState(null);
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userEmail = localStorage.getItem('email');
    console.log("ParticipantDetailsPage userEmail:", userEmail);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Fetching data for email:", userEmail);
            const response = await axios.get(`http://localhost:8000/participant_data/?email=${userEmail}`);

            console.log("API response:", response.data);

            setParticipantData(response.data);
            console.log("Data fetched successfully");

        } catch (err) {
            setError(err.message || 'Failed to fetch data');
            setParticipantData(null);
        } finally {
            setLoading(false);
        }
    };

    const sendComments = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:8000/send_query', {
                email: userEmail, // Send email instead of participant_id
                comments: comments,
            });
            alert('Comments sent successfully!');
            setComments('');
        } catch (err) {
            setError(err.message || 'Failed to send comments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

    const renderLevelData = (levelData, levelName) => {
        if (!levelData || Object.keys(levelData).length === 0) {
            return <Typography>No data for {levelName}</Typography>;
        }

        const rows = levelData['Primary Tech Stack'].map((tech, index) => ({
            id: index,
            tech: tech,
            status: levelData['Status'][index],
            invites: levelData['# of invites'][index],
            lastInvited: levelData['Last invited on'][index],
        }));

        const columns = [
            { field: 'tech', headerName: 'Primary Tech Stack', flex: 1 },
            { field: 'status', headerName: 'Status', flex: 1 },
            { field: 'invites', headerName: '# of invites', flex: 1 },
            { field: 'lastInvited', headerName: 'Last invited on', flex: 1 },
        ];

        return (
            <Box mt={2}>
                <Typography variant="h6">{levelName}</Typography>
                <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick />
            </Box>
        );
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box p={3}>
            {participantData && (
                <Box mt={2}>
                    <Typography variant="h5">Participant Details</Typography>
                    <Typography>Name: {participantData['Name of the learner']}</Typography>
                    <Typography>StepUp started on: {participantData['StepUp started on']}</Typography>
                    <Typography>Designation: {participantData.Designation}</Typography>
                    <Typography>Email ID: {participantData['Email ID']}</Typography>
                    <Typography>Batch No: {participantData['Batch No']}</Typography>
                    <Typography>Role: {participantData.Role}</Typography>

                    {Object.keys(participantData)
                        .filter((key) => key.startsWith('Level'))
                        .map((levelKey) => renderLevelData(participantData[levelKey], levelKey))}
                </Box>
            )}

            <Box mt={3}>
                <TextField
                    label="Comments"
                    multiline
                    rows={4}
                    fullWidth
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={sendComments} mt={2}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default ParticipantDetailsPage;