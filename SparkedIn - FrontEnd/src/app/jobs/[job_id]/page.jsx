"use client";

import React from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Divider,
  TextField,
  Link,
  Button,
} from "@mui/material";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import { useQuery } from "@tanstack/react-query";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { redirect } from "next/navigation";

export default function JobDetailsPage({ params }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job_id", params.job_id],
    queryFn: async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/api/jobs/" + params.job_id
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const job = data[0];

  return (
    <>
      <Box sx={{ p: 4 }}>
        <div>Job ID: {params.job_id}</div>
        {/* Job Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            {job.job_title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {job.organization}
          </Typography>
        </Box>

        {/* Job Description */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            Job Description
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {job.job_description}
          </Typography>
        </Box>

        {/* Skills Required */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            Skills Required
          </Typography>
          <Box sx={{ mt: 2 }}>
            {job.skills.split(",").map((skill, index) => (
              <Chip
                key={index}
                label={skill.trim()}
                color="primary"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Box>

        {/* Hiring Manager */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            Hiring Manager
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar
              alt={job.hm_name}
              src="/path/to/hiring_manager.jpg"
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">{job.hm_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {job.hm_email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Recruiter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            Recruiter
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar
              alt={job.recruiter_name}
              src="/path/to/recruiter.jpg"
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">{job.recruiter_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {job.recruiter_email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Location */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            Location
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <PlaceOutlined sx={{ color: "gray", mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              {job.location}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider variant="fullWidth" />

      <JobApplicationForm job_id={params.job_id} />
    </>
  );
}

function JobApplicationForm(props) {
  const [comments, setComments] = React.useState('');
  const [moveBefore, setMoveBefore] = React.useState('');
  const [eligibility, setEligibility] = React.useState('no');
  console.log(props.job_id)

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleMoveBeforeChange = (event) => {
    setMoveBefore(event.target.value);
  };

  const handleEligibilityChange = (event) => {
    setEligibility(event.target.value);
  };

  const handleSubmit = async () => {
    // Handle form submission
    console.log('Comments:', comments);
    console.log('Move Before:', moveBefore);
    console.log('Eligibility:', eligibility);
    submitApplication({
      userId: JSON.parse(localStorage.getItem("selectedUser")).userId,
      jobId: props.job_id,
      comments,
      availability: moveBefore,
      status: "Applied"
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1">Apply to the job</Typography>
      <br />
      <TextField
        multiline
        minRows={3}
        sx={{ width: "50%" }}
        label="Any comments to the hiring manager? (optional)"
        placeholder="Type your comments to hiring manager"
        value={comments}
        onChange={handleCommentsChange}
      />
      <br />
      <br />
      <TextField
        sx={{ width: "50%" }}
        label="You are looking to move before? (optional)"
        placeholder="2-3 months"
        value={moveBefore}
        onChange={handleMoveBeforeChange}
      />
      <br />
      <br />
      <FormControl>
        <FormLabel id="eligibility-radio-buttons-group-label">
          <Typography color="red" fontWeight="bold">Are you eligible to apply?</Typography>
          <Link href="#">Check here!</Link>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="eligibility-radio-buttons-group-label"
          name="eligibility-radio-buttons-group"
          value={eligibility}
          onChange={handleEligibilityChange}
        >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <Button
        size="large"
        variant="contained"
        disableElevation
        disabled={moveBefore === 'no'}
        sx={{ width: "50%" }}
        onClick={handleSubmit}
      >
        Submit Application
      </Button>
    </Box>
  );
}

async function submitApplication(applicationData) {

  console.log("DATA: ", applicationData)
  const url = 'http://localhost:5000/api/applied_applications';
  
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