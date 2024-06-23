// "use client";
// import React, { useState } from "react";
// import CustomSearchBar from "../../components/Search";
// import CustomCard1 from "../../components/Card";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import {
//   Grid,
//   Avatar,
//   Tooltip,
//   Divider,
//   Stack,
//   Chip,
//   ToggleButtonGroup,
//   ToggleButton,
//   Icon,
//   IconButton,
// } from "@mui/material";
// import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
// import Bookmark from "@mui/icons-material/Bookmark";
// import { PlaceOutlined, BusinessRounded } from "@mui/icons-material";
// import { Gauge } from "@mui/x-charts/Gauge";
// import { styled } from "@mui/material/styles";
// import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
// import { blue, green, yellow } from "@mui/material/colors";
// import GitHub from "@mui/icons-material/GitHub";
// import Search from "../../components/Search";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import JobCard from "../../components/JobCard";
// import {useJobStore} from "../../stores/jobs";

// export default function Home() {
//   const jobs = useJobStore((state) => state.jobs);
//   const updateStore = useJobStore((state) => state.updateJobs);
  
//   // Access the client
//   const queryClient = useQueryClient();
//   const result = useQuery({
//     queryKey: ["jobs"],
//     queryFn: async () => {
//       const response = await fetch("http://127.0.0.1:5000/api/jobs");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     },
//   });


//   const [alignment, setAlignment] = React.useState("all");

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

//   console.log(result);

//   if (result.isPending) {
//     return (
//       <>
//         <Typography variant="h1">Loading data</Typography>
//       </>
//     );
//   }

//   if (result.isSuccess) {
//     updateStore(result.data);
//   }


  

//   return (
//     <>
//       <Search />
//       <br />
//       <br />
//       <br />
//       <br />

//       <ToggleButtonGroup
//         color="success"
//         value={alignment}
//         exclusive
//         onChange={handleChange}
//         aria-label="Platform"
//       >
//         <ToggleButton value="all">Browse All Jobs</ToggleButton>
//         <ToggleButton value="suggested">For you</ToggleButton>
//       </ToggleButtonGroup>

//       {alignment === "all" ? (
//         <>
//           <Grid container spacing={2}>
//             {jobs.map((job, index) => (
//               <Grid item sm={6} key={index}>
//                 <JobCard job={job} />
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       ) : (
//         <>
//           {" "}
//           <Typography>No jobs</Typography>{" "}
//         </>
//       )}
//     </>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Search from "../../components/Search";
import JobCard from "../../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { useJobStore } from "../../stores/jobs";
import All from "./All";
import ForYou from "./ForYou";

export default function Home() {
  // const updateStore = useJobStore((state) => state.updateJobs);
  // const jobs = useJobStore((state) => state.jobs);

  // useEffect(() => {
  //   const get = async () => {
  //     const response = await fetch("http://127.0.0.1:5000/api/jobs/user/" + JSON.parse(localStorage.getItem("selectedUser")).userId);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data1 = await response.json();
  //     updateStore(data1);
  //   }

  //   get();

  // }, []);

  // console.log("JOBS: " ,data)
  // if (isSuccess) {
  //   updateStore(data);

  // }

  const [alignment, setAlignment] = useState("all");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // if (isLoading) {
  //   return <Typography variant="h1">Loading data...</Typography>;
  // }

  // if (isError) {
  //   return <Typography variant="h1">Error loading data...</Typography>;
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
        <All />
      ) : (
        <ForYou />
      )}
    </>
  );
}

// import { create } from 'zustand'

// export const useJobStore = create((set) => ({
//   jobs: [],
//   updateJobs: (newJobs) => set(() => ({ jobs: newJobs })),
// }));
