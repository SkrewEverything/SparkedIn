"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import Search from "../../components/Search";
import JobCard from "../../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { useJobStore } from "../../stores/jobs";

export default function Home() {
  const updateStore = useJobStore((state) => state.updateJobs);
  const jobs = useJobStore((state) => state.jobs);

  useEffect(() => {
    const get = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/for_you/" +
          JSON.parse(localStorage.getItem("selectedUser")).userId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({})
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data1 = await response.json();
      updateStore(data1);
    };

    get();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item sm={6} key={index}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
