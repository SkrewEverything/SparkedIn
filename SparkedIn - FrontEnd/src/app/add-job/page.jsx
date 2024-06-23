"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export default function AddJobPostingPage() {
  const [job, setJob] = useState({
    employment_type: "",
    experience: "",
    hmId: "",
    hm_email: "",
    hm_name: "",
    jobId: "",
    job_description: "",
    job_title: "",
    organization: "",
    recruiter_email: "",
    recruiter_name: "",
    skills: "",
    location: "",
    duration: "",
    jobId: "",
  });

  const addJob = async (newJob) => {
    console.log("Sending job data to API:", newJob); // Logging the data being sent
    const response = await fetch("http://127.0.0.1:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: addJob,
    onSuccess: (data) => {
      console.log("Job successfully added:", data); // Logging success response
    },
    onError: (error) => {
      console.error("Error adding job:", error); // Logging error response
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting job data:", job); // Logging the job data before submission
    mutation.mutate(job, {
      onSuccess: (data) => {
        console.log("Job successfully added:", data); // Logging success response
      },
      onError: (error) => {
        console.error("Error adding job:", error); // Logging error response
      },
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Add New Job Posting
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" sx={{ mb: 4 }}>
          <FormLabel component="legend">Organization</FormLabel>
          <RadioGroup
            aria-label="organization"
            name="organization"
            value={job.organization}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="Walmart"
              control={<Radio />}
              label="Walmart"
            />
            <FormControlLabel
              value="Sams Club"
              control={<Radio />}
              label="Sams Club"
            />
          </RadioGroup>
        </FormControl>

        <br />

        <FormControl component="fieldset" sx={{ mb: 4 }}>
          <FormLabel component="legend">Employment Type</FormLabel>
          <RadioGroup
            aria-label="employment_type"
            name="employment_type"
            value={job.employment_type}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="Full-Time"
              control={<Radio />}
              label="Full-Time"
            />
            <FormControlLabel
              value="Contract"
              control={<Radio />}
              label="Contract"
            />
            <FormControlLabel
              value="Temporary"
              control={<Radio />}
              label="Temporary"
            />
          </RadioGroup>
        </FormControl>

        {(job.employment_type === "Temporary" ||
          job.employment_type === "Contract") && (
          <>
            <TextField
              label="Duration"
              name="duration"
              value={job.duration}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 4 }}
            />
          </>
        )}

        <TextField
          label="Job ID"
          name="jobId"
          value={job.jobId}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />

        <TextField
          label="Job Title"
          name="job_title"
          value={job.job_title}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Job Description"
          name="job_description"
          value={job.job_description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 4 }}
        />
        <TextField
          label="Experience"
          name="experience"
          value={job.experience}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Hiring Manager ID"
          name="hmId"
          value={job.hmId}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Hiring Manager Email"
          name="hm_email"
          value={job.hm_email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Hiring Manager Name"
          name="hm_name"
          value={job.hm_name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Recruiter Email"
          name="recruiter_email"
          value={job.recruiter_email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Recruiter Name"
          name="recruiter_name"
          value={job.recruiter_name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Skills"
          name="skills"
          value={job.skills}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          label="Location"
          name="location"
          value={job.location}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Add Job Posting
        </Button>
      </form>
    </Box>
  );
}
