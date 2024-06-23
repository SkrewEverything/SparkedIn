"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LinearProgress, Chip, Stack, Typography, IconButton, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Custom render for actions with accept/reject buttons
const renderActions = (params) => {

  const curr_id = JSON.parse(localStorage.getItem("selectedUser")).userId;
  
  return (

  <Stack direction="row" spacing={1}>
    {curr_id !== params.row.hmId &&
    <IconButton aria-label="accept" color="primary" onClick={() => handleAccept(params.row)} disabled={params.row.status === "Reject" ||  params.row.status === "Accept"}>
      <CheckIcon />
    </IconButton>
}
    <IconButton aria-label="reject" color="secondary" onClick={() => handleReject(params.row)} disabled={params.row.status === "Reject" }>
      <CloseIcon />
    </IconButton>
  </Stack>
)};

// Handle accept action
const handleAccept = async (row) => {
  try {
    await fetch('http://127.0.0.1:5000/api/update_hm_request_status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidate_id: row.candidateId, job_id: row.jobId, status: "Accept", hm_id: row.hmId }),
    });
    console.log('Accepted:', row);
  } catch (error) {
    console.error('Error accepting candidate:', error);
  }
};

// Handle reject action
const handleReject = async (row) => {
  try {
    await fetch('http://127.0.0.1:5000/api/update_hm_request_status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidate_id: row.candidateId, job_id: row.jobId, status: "Reject", hm_id: row.hmId }),
    });
    console.log('Rejected:', row);
  } catch (error) {
    console.error('Error rejecting candidate:', error);
  }
};

// Custom render for name with title
const renderNameWithTitle = (params) => (
  <Stack>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      {params.row.candidatename}
    </Typography>
  </Stack>
);

const columns = [
  { field: 'id', headerName: 'S.No', width: 70 },
  {
    field: 'candidatename',
    headerName: 'Candidate Name',
    width: 200,
    renderCell: renderNameWithTitle,
  },
  {
    field: 'jobId',
    headerName: 'Job ID',
    width: 100,
  },
  {
    field: 'hmname',
    headerName: 'Hiring Manager',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: renderActions,
  },
];

// const rows = [
//   { id: 1, candidateId: "u2", candidatename: "John Doe", comments: "12222", hmId: "u10", hmname: "Lucas Yellow", jobId: "12", status: "Waiting" },
// ];

export default function DataGridDemo() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function getList() {
      const response = await fetch("http://127.0.0.1:5000/api/hm_requests/" + JSON.parse(localStorage.getItem("selectedUser")).userId)
      let data1 = await response.json();
      
      console.log("data1: ", data1)
      for (let i = 0; i < data1.length; i++) {
        data1[i].id = i + 1;
      }
      console.log("data1: ", data1)
      setRows(data1);
    }

    getList()
  }, []);

  return (
    <Box sx={{ 
        height: 'auto', 
        width: '100%', // Ensure the Box takes full width
        maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' }, // Add responsive maxWidth
        backgroundColor: 'white', 
        p: 2, 
        borderRadius: 2 }}>
      <DataGrid
        rows={rows}
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
  );
}
