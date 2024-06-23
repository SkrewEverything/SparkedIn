"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LinearProgress, Chip, Stack, Typography, IconButton, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

// Custom render for skill match and keyword match
const renderMatch = (params) => (
  <Box sx={{ width: '100%', textAlign: 'center' }}>
    <Typography variant="body2" sx={{ mb: 0.5 }}>{params.value}</Typography>
    <LinearProgress variant="determinate" value={parseInt(params.value, 10)} />
  </Box>
);

// Custom render for skills
const renderSkills = (params) => (
  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
    {params.value.map((skill, index) => (
      <Chip key={index} label={skill} size="small" variant="outlined" />
    ))}
  </Stack>
);

// Custom render for actions
const renderActions = (params) => (
  <Stack direction="row" spacing={1}>
    <Button color="success" disabled={params.row.status !== "Applied"} onClick={() => updateApplicationStatus(params.row.candidate_user_id, params.row.job_id, "In Progress")}>Move forward</Button>
    <Button color="error" disabled={params.row.status === "Rejected" || params.row.status === "Withdraw"} onClick={() => updateApplicationStatus(params.row.candidate_user_id, params.row.job_id, "Rejected")}>Reject</Button>
  </Stack>
);

async function updateApplicationStatus(userId, jobId, status) {
  const payload = {
      user_id: userId,
      job_id: jobId,
      status: status
  };

  try {
      const response = await fetch('http://localhost:5000/api/update_application_status', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Status Update:', data);
      alert(data.message)
  } catch (error) {
      console.error('Error:', error);
  }
}

// Custom render for name with title
const renderNameWithTitle = (params) => (
  <Stack>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      {params.row.candidate_name}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      {params.row.hm_email}
    </Typography>
  </Stack>
);

const columns = [
  { field: 'id', headerName: 'S.No', width: 70 },
  {
    field: 'fullName',
    headerName: 'Name',
    width: 200,
    renderCell: renderNameWithTitle,
  },
  {
    field: 'job_id',
    headerName: 'Job ID',
    width: 100,
    renderCell: (params) => (
      <Link href={"/jobs/" + params.row.job_id}>{params.row.job_id}</Link>
    )
  },
  {
    field: 'experience',
    headerName: 'Experience of Candidate(Years)',
    type: 'number',
    width: 150,
    align: 'center',
  },
  // {
  //   field: 'keywordMatch',
  //   headerName: 'Keyword Match',
  //   width: 150,
  //   renderCell: renderMatch,
  // },
  {
    field: 'availability',
    headerName: 'Wants to get hired in',
    width: 150,
    renderCell: (params) => (
      <Typography variant="body2" color="textSecondary">
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 250,
    renderCell: (params) => (
      <Typography variant="body2" color="textSecondary">
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: renderActions,
  },
];

const rows = [
  { id: 1, job_id: "j2", status: "In Progress", lastName: 'Snow', firstName: 'Jon', experience: 5, skills: ['Java', 'Kafka', 'Python', 'MySQL'], skillMatch: '68%', keywordMatch: '50%', currentTitle: "Senior Manager", availability: 'Immediate', location: 'Winterfell' },
  { id: 2, job_id: "j3", status: "Rejected", lastName: 'Lannister', firstName: 'Cersei', experience: 3, skills: ['Python', 'React', 'Node.js'], skillMatch: '75%', keywordMatch: '80%', currentTitle: "Senior Software Engineer", availability: '1 Month', location: 'King\'s Landing' },
  { id: 3, job_id: "j4", status: "Not started", lastName: 'Stark', firstName: 'Arya', experience: 2, skills: ['JavaScript', 'HTML', 'CSS'], skillMatch: '85%', keywordMatch: '90%', currentTitle: "Software Engineer III", availability: '2 Weeks', location: 'Braavos' },
  // Add more rows as needed
];

export default function DataGridDemo() {
  const [receivedList, setReceivedList] = React.useState([]);

  React.useEffect(() => {
    async function getList() {
      const appliedTo = await getReceivedJobs();
      for (let i = 0; i < appliedTo.length; i++) {
        appliedTo[i].id = i + 1;
      }
      console.log("DATA: ", appliedTo)
      setReceivedList(appliedTo);
    }

    getList();
  }, []);
  
  console.log("RECEIVED: ", receivedList);
  return (
    <>
    <Box sx={{ 
        height: 'auto', 
        width: '100%', // Ensure the Box takes full width
        maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' }, // Add responsive maxWidth
        backgroundColor: 'white', 
        p: 2, 
        borderRadius: 2 }}>
          <Typography variant='h1' color="GrayText">Jobs people applied to your post</Typography>
          <br/>
      <DataGrid
        rows={receivedList}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: 'unset',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
    </Box>

    </>
  );
}

async function getReceivedJobs () {
  const selectedUser = localStorage.getItem("selectedUser");
  const response = await fetch('http://127.0.0.1:5000/api/applications/hm/' + JSON.parse(selectedUser).userId)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}