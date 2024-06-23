"use client";
import React, { useState } from "react";
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
import JobCard from "../../components/JobCard";

export default function Home() {
  // Access the client
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ['jobs',],
    queryFn: async () => {
      const selectedUser = localStorage.getItem("selectedUser");
      const response = await fetch('http://127.0.0.1:5000/api/bookmarks/' + JSON.parse(selectedUser).userId)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  console.log(result);

  if (result.isPending) {
    return (<>
      <Typography variant="h1">Loading data</Typography>
    </>)
  }


  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <Grid container spacing={2}>
      {result.data.map((job, index) => (
        <Grid item sm={6} key={index} >
        <JobCard job={job} />
        </Grid>
      ))}
      </Grid>
    </>
  );
}
