"use client";

import * as React from "react";
import { useQuizStore } from "../../stores/quiz";
import {
    Stack,
    Container,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Grid,
    Box,
    Typography
  } from "@mui/material";

export default function Education() {
    const [educationLevel, setEducationLevel] = React.useState(useQuizStore((state) => state.education));
    const updateStore = useQuizStore((state) => state.updateEducation);
    console.log("Education: ", educationLevel);
  
    const handleEducationChange = (event) => {
      console.log("Changed");
      setEducationLevel(event.target.value);
      updateStore(event.target.value)
    };
  
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          What is your highest level of education?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-labelledby="education-level-group-label"
            value={educationLevel}
            onChange={handleEducationChange}
            name="education-level-group"
          >
            <FormControlLabel
              value="inProgress"
              control={<Radio />}
              label="Pursuing a Degree"
            />
            <FormControlLabel
              value="Associate"
              control={<Radio />}
              label="Associate"
            />
            <FormControlLabel
              value="bachelors"
              control={<Radio />}
              label="Bachelors"
            />
            <FormControlLabel
              value="masters"
              control={<Radio />}
              label="Masters"
            />
            <FormControlLabel value="phd" control={<Radio />} label="PhD" />
            <FormControlLabel
              value="N/A"
              control={<Radio />}
              label="Prefer not to answer"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  }
  