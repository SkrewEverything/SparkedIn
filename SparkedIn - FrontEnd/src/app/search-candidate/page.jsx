"use client";
import React, { useEffect, useState } from "react";
import CustomSearchBar from "../../components/Search";
import CustomCard1 from "../../components/Card";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Avatar,
  Tooltip,
  Divider,
  Stack,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Icon,
  IconButton,
} from "@mui/material";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Bookmark from "@mui/icons-material/Bookmark";
import { PlaceOutlined, BusinessRounded } from "@mui/icons-material";
import { Gauge } from "@mui/x-charts/Gauge";
import { styled } from "@mui/material/styles";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import { blue, green, yellow } from "@mui/material/colors";
import GitHub from "@mui/icons-material/GitHub";
import Search from "../../components/Search";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import CandidateCard from "../../components/CandidateCard";

export default function Home() {

  const[result, setResult] = React.useState([])

  // Access the client
  const queryClient = useQueryClient();
  // const result = useQuery({
  //   queryKey: ["jobs"],
  //   queryFn: async () => {
  //     const response = await fetch("http://127.0.0.1:5000/api/jobs");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   },
  // });

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/users_details');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setResult(data);
      
    }

    getUsers();
  }, [])

  const [alignment, setAlignment] = React.useState("all");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  console.log(result);

  // if (result.isPending) {
  //   return (
  //     <>
  //       <Typography variant="h1">Loading data</Typography>
  //     </>
  //   );
  // }

  return (
    <>
      <br />
      <br />
      <br />

      <ToggleButtonGroup
        color="success"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="all">Browse All Jobs</ToggleButton>
        <ToggleButton value="suggested">For you</ToggleButton>
      </ToggleButtonGroup>

      {alignment === "all" ? (
        <>
          <Grid container spacing={2}>
            {result.map((job, index) => (
              <Grid item sm={6} key={index}>
                <CandidateCard candidate={job} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          {" "}
          <Typography>No Candidates</Typography>{" "}
        </>
      )}
    </>
  );
}

const sampleCandidate = [{
  id: "u2",
  name: "John Doe",
  employmentType: "Full-Time",
  location: "San Francisco, CA, US",
  role: "Senior Software Engineer",
  experience: 8,
  skills: "JavaScript, React, Node.js, Python, AWS",
  bookmarked: false,
}];
