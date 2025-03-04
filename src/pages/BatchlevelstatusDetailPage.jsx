

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";

// function BatchlevelstatusDetailPage() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const batchId = searchParams.get("batch");
//   const levelId = searchParams.get("level");
//   const status = searchParams.get("status");
//   const [learners, setLearners] = useState([]);
//   const [batchNo, setBatchNo] = useState("");
//   const [levelNo, setLevelNo] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/learner_detail?batch=${batchId}&level=${levelId}&status=${status}`
//         );
//         console.log("Learner Response:", response.data);
//         setLearners(response.data.learners);
//         setBatchNo(response.data.batch);
//         setLevelNo(response.data.level);
//       } catch (error) {
//         console.error("Error fetching learner details:", error);
//       }
//     };

//     if (batchId && levelId) {
//       fetchData();
//     }
//   }, [batchId, levelId, status]);

//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   const getColumns = () => {
//     if (status === "fail" && levelNo === "L1" && learners.length > 0) {
//       const subjectColumns = Object.keys(learners[0])
//         .filter(
//           (key) =>
//             key !== "Name" &&
//             key !== "Email ID" &&
//             key !== "No. of assessments Passed"
//         )
//         .map((subject) => ({ field: subject, headerName: subject, width: 150 }));

//       return [
//         { field: "Name", headerName: "Name", width: 200 },
//         { field: "Email ID", headerName: "Email ID", width: 250 },
//         ...subjectColumns,
//         {
//           field: "No. of assessments Passed",
//           headerName: "No. of assessments Passed",
//           width: 200,
//         },
//       ];
//     } else if (status === "pass" && levelNo === "L1") {
//       return [
//         { field: "Name", headerName: "Name", width: 200 },
//         { field: "Email ID", headerName: "Email ID", width: 250 },
//         {
//           field: "Primary Tech Stack",
//           headerName: "Primary Tech Stack",
//           width: 200,
//         },
//         {
//           field: "Invited for next level",
//           headerName: "Invited for next level",
//           width: 150,
//         },
//       ];
//     } else if (
//       ["fail", "in-progress"].includes(status) &&
//       ["L2", "L3", "L4", "L5"].includes(levelNo) &&
//       learners.length > 0
//     ) {
//       const levelStatusField = `Level ${levelNo.slice(1)} Status`;
//       return [
//         { field: "Name", headerName: "Name", width: 200 },
//         { field: "Email ID", headerName: "Email ID", width: 250 },
//         { field: levelStatusField, headerName: levelStatusField, width: 150 },
//         {
//           field: "Primary Tech Stack",
//           headerName: "Primary Tech Stack",
//           width: 200,
//         },
//         {
//           field: "No. of attemps invited",
//           headerName: "No. of attemps invited",
//           width: 150,
//         },
//         {
//           field: "No of times attempted",
//           headerName: "No of times attempted",
//           width: 150,
//         },
//       ];
//     } else {
//       return [
//         { field: "Name", headerName: "Name", width: 200 },
//         { field: "Email ID", headerName: "Email ID", width: 250 },
//         {
//           field: "Primary Tech Stack",
//           headerName: "Primary Tech Stack",
//           width: 200,
//         },
//         {
//           field: "Invited for next level",
//           headerName: "Invited for next level",
//           width: 150,
//         },
//       ];
//     }
//   };

//   const columns = getColumns();

//   return (
//     <Box sx={{ height: 600, width: "100%", p: 2 }}>
//       <h2>
//         {batchNo} | {levelNo} | Status: {status}
//       </h2>
//       <Button
//         variant="outlined"
//         onClick={handleBack}
//         sx={{ mb: 2, backgroundColor: "#1565c0", color: "Black" }}
//       >
//         Back
//       </Button>
//       <DataGrid
//         rows={learners}
//         columns={columns}
//         getRowId={(row) => row["Email ID"]}
//         sx={{
//           "--unstable_DataGrid-headWeight": "bold",
//         }}
//       />
//     </Box>
//   );
// }

// export default BatchlevelstatusDetailPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function BatchlevelstatusDetailPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const batchId = searchParams.get("batch");
  const levelId = searchParams.get("level");
  const status = searchParams.get("status");
  const [learners, setLearners] = useState([]);
  const [batchNo, setBatchNo] = useState("");
  const [levelNo, setLevelNo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/learner_detail?batch=${batchId}&level=${levelId}&status=${status}`
        );
        console.log("Learner Response:", response.data);
        setLearners(response.data.learners);
        setBatchNo(response.data.batch);
        setLevelNo(response.data.level);
      } catch (error) {
        console.error("Error fetching learner details:", error);
      }
    };

    if (batchId && levelId) {
      fetchData();
    }
  }, [batchId, levelId, status]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const getColumns = () => {
    if (status === "fail" && levelNo === "L1" && learners.length > 0) {
      const subjectColumns = Object.keys(learners[0])
        .filter(
          (key) =>
            key !== "Name" &&
            key !== "Email ID" &&
            key !== "No. of assessments Passed"
        )
        .map((subject) => ({ field: subject, headerName: subject, width: 150 }));

      return [
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Email ID", headerName: "Email ID", width: 250 },
        ...subjectColumns,
        {
          field: "No. of assessments Passed",
          headerName: "No. of assessments Passed",
          width: 200,
        },
      ];
    } else if (status === "pass" && levelNo === "L1") {
      return [
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Email ID", headerName: "Email ID", width: 250 },
        {
          field: "Primary Tech Stack",
          headerName: "Primary Tech Stack",
          width: 200,
        },
        {
          field: "Invited for next level",
          headerName: "Invited for next level",
          width: 150,
        },
      ];
    } else if (
      ["fail", "in-progress"].includes(status) &&
      ["L2", "L3", "L4", "L5"].includes(levelNo) &&
      learners.length > 0
    ) {
      const levelStatusField = `Level ${levelNo.slice(1)} Status`;
      return [
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Email ID", headerName: "Email ID", width: 250 },
        { field: levelStatusField, headerName: levelStatusField, width: 150 },
        {
          field: "Primary Tech Stack",
          headerName: "Primary Tech Stack",
          width: 200,
        },
        {
          field: "No. of attemps invited",
          headerName: "No. of attemps invited",
          width: 150,
        },
        {
          field: "No of times attempted",
          headerName: "No of times attempted",
          width: 150,
        },
      ];
    } else {
      return [
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Email ID", headerName: "Email ID", width: 250 },
        {
          field: "Primary Tech Stack",
          headerName: "Primary Tech Stack",
          width: 200,
        },
        {
          field: "Invited for next level",
          headerName: "Invited for next level",
          width: 150,
        },
      ];
    }
  };

  const columns = getColumns();

  const getStatusDisplay = () => {
    if (status === "fail" || status === "in-progress") {
      return "fail/Inprogress";
    }
    return status;
  };

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      <h2>
        {batchNo} | {levelNo} | Status: {getStatusDisplay()}
      </h2>
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{ mb: 2, backgroundColor: "#1565c0", color: "Black" }}
      >
        Back
      </Button>
      <DataGrid
        rows={learners}
        columns={columns}
        getRowId={(row) => row["Email ID"]}
        sx={{
          "--unstable_DataGrid-headWeight": "bold",
        }}
      />
    </Box>
  );
}

export default BatchlevelstatusDetailPage;