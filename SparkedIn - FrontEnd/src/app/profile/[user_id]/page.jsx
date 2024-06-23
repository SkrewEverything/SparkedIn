"use client";
import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Stack,
} from "@mui/material";

export default function ProfilePage({ params }) {
  const [jobId, setJobId] = useState('');
  const [comments, setComments] = useState('');
  const [locationPreferences, setLocationPreferences] = useState([
    "New York",
    "San Francisco",
    "Remote"
  ]);
  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python"
  ]);

  const handleSubmit = () => {
      const payload = {
        hm_id: JSON.parse(localStorage.getItem("selectedUser")).userId,
        candidate_id: params.user_id,
        job_id: jobId,
        comments: comments,
        status: "Waiting"
      }

      submitApplication(payload);
  }

  const handleJobIdChange = (event) => {
    setJobId(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Profile Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          alt="Profile Picture"
          src="/path/to/image.jpg"
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography>{params.user_id}</Typography>
          <Typography variant="h4">John Doe</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Software Engineer
          </Typography>
        </Box>
      </Box>

      {/* Location Preferences */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          Location Preferences
        </Typography>
        <Box sx={{ mt: 2 }}>
          {locationPreferences.map((location, index) => (
            <Chip label={location} variant="outlined" sx={{ ml: index > 0 ? 1 : 0 }} key={index} />
          ))}
        </Box>
      </Box>

      {/* Skills List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          Skills
        </Typography>
        <Box sx={{ mt: 2 }}>
          {skills.map((skill, index) => (
            <Chip label={skill} color="primary" sx={{ ml: index > 0 ? 1 : 0 }} key={index} />
          ))}
        </Box>
      </Box>

      {/* Education */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          Education
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="B.Sc. in Computer Science"
              secondary="University of XYZ, 2015-2019"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="M.Sc. in Data Science"
              secondary="University of ABC, 2019-2021"
            />
          </ListItem>
        </List>
      </Box>

      {/* Experience */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          Experience
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Software Engineer"
              secondary="Tech Company, 2021-Present"
            />
            <Typography variant="body2" color="textSecondary">
              Developed and maintained web applications using React and Node.js.
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Junior Developer"
              secondary="Another Tech Company, 2019-2021"
            />
            <Typography variant="body2" color="textSecondary">
              Worked on backend services using Python and Django.
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider />
      <br />
      <br />

      <Stack
        direction="column"
        sx={{ width: "50%" }}
        spacing={2}
        alignItems="center"
      >
        <Typography variant="h5">
          Like the profile? Reach out to them
        </Typography>
        <TextField
          variant="outlined"
          label="Job ID"
          placeholder="Enter the Job ID"
          fullWidth
          value={jobId}
          onChange={handleJobIdChange}
        />
        <TextField
          multiline
          minRows={3}
          variant="outlined"
          label="Comments (Optional)"
          placeholder="Comments"
          fullWidth
          value={comments}
          onChange={handleCommentsChange}
        />
        <Button variant="contained" disableElevation sx={{ width: "50%" }} onClick={handleSubmit}>
          Send them request
        </Button>
      </Stack>
    </Box>
  );
}



async function submitApplication(applicationData) {

  console.log("DATA: ", applicationData)
  const url = 'http://localhost:5000//api/hm_request';
  
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        console.log("Response: ", response)
          throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      alert("Submitted!");
      redirect("/applications")
      return data;
  } catch (error) {
      console.error('Error:', error);
  }
}