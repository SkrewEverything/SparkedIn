"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import {
  AccessTimeOutlined,
  PlaceOutlined,
  BusinessRounded,
  Bookmark,
  BookmarkBorder,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
} from "@mui/icons-material";

import { blue, green, yellow } from "@mui/material/colors";
import { usePathname } from "next/navigation";

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  maxWidth: 700,
  minHeight: "380px",
  margin: "20px auto",
  display: "flex",
  flexDirection: "column",
  "& .MuiCardContent-root": {
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  "& .MuiCardActions-root": {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
}));

const JobTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: blue[900],
}));

const JobMatch = styled(Typography)(({ theme }) => ({
  color: green[600],
}));

const TemporaryCard = ({ job }) => {
  const pathname = usePathname();
  const [bookmarked, setBookmarked] = useState(job.bookmarked);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    async function init() {
      if (pathname === "/saved") {
        setBookmarked(true);
      } else {
        // try {
        //     const selectedUser = localStorage.getItem("selectedUser");
        //     const result = await fetch('http://127.0.0.1:5000/api/bookmarks/' + JSON.parse(selectedUser).userId + "/" + job.jobId)
        //     const count = await result.json();
        //     console.log("Count: ", count);
        //     setBookmarked(count[0].count == 1)
        //   } catch (error) {
        //     console.error('Error updating bookmark:', error);
        //   }
      }
    }

    init();
  }, []);

  const handleBookmarkClick = async () => {
    setBookmarked(!bookmarked);
    const selectedUser = localStorage.getItem("selectedUser");

    try {
      await fetch("http://127.0.0.1:5000/api/bookmarks", {
        method: !bookmarked ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.jobId,
          userId: JSON.parse(selectedUser).userId,
        }),
      });
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const handleLikeClick = async () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
    const selectedUser = localStorage.getItem("selectedUser");
    try {
      await fetch("http://127.0.0.1:5000/api/suggestion", {
        method: !liked ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.jobId,
          userId: JSON.parse(selectedUser).userId,
          liked: true,
        }),
      });
    } catch (error) {
      console.error("Error updating suggestion:", error);
    }
  };

  const handleDislikeClick = async () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
    const selectedUser = localStorage.getItem("selectedUser");
    try {
      await fetch("http://127.0.0.1:5000/api/suggestion", {
        method: !disliked ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.jobId,
          userId: JSON.parse(selectedUser).userId,
          liked: disliked,
        }),
      });
    } catch (error) {
      console.error("Error updating suggestion:", error);
    }
  };

  return (
    <CustomCard variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <JobTitle variant="h5" component="div">
            {job.job_title}
          </JobTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Chip
              label={job.employment_type}
              color="secondary"
              size="small"
              sx={{ backgroundColor: "#ffeb3b", color: "#000" }}
            />
            <JobMatch variant="caption">{job.matching_score}% match</JobMatch>
            <IconButton
              onClick={handleBookmarkClick}
              sx={{ color: bookmarked ? yellow[700] : "grey" }}
            >
              {bookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} alignItems="center" marginBottom={2}>
          <AccessTimeOutlined fontSize="small" sx={{ color: "gray" }} />
          <Typography variant="body2" color="text.secondary">
            Posted on {job.createdAt}
          </Typography>
          {job.duration && (
            <Typography variant="body2" color="text.secondary">
              Duration: {job.duration}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={2} marginBottom={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PlaceOutlined sx={{ color: "gray" }} />
            <Typography variant="subtitle2">{job.location}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BusinessRounded sx={{ color: "gray" }} />
            <Typography variant="subtitle2">{job.organization}</Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          marginBottom={4}
          useFlexGap
          flexWrap="wrap"
        >
          {job.skills.split(",").map((skill, index) => (
            <Chip
              key={index}
              label={skill.trim()}
              size="medium"
              sx={{ backgroundColor: blue[50] }}
            />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {truncateText(job.job_description)}
        </Typography>
      </CardContent>

      <CardActions sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            size="large"
            sx={{ color: "#1e88e5", textTransform: "none" }}
            href={`/jobs/${job.jobId}`}
          >
            More Details
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography variant="body2">Suggestion </Typography>
            <IconButton
              size="small"
              onClick={handleLikeClick}
              sx={{ color: liked ? green[500] : "inherit" }}
            >
              <ThumbUpAltOutlined fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDislikeClick}
              sx={{ color: disliked ? "red" : "inherit" }}
            >
              <ThumbDownAltOutlined fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardActions>
    </CustomCard>
  );
};

function truncateText(text) {
  if (text.length > 250) {
    return text.substring(0, 250) + "...";
  }

  return text;
}

export default TemporaryCard;
