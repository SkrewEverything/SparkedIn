import React, { useState } from 'react';
import { Box, Typography, FormControl, FormLabel, FormControlLabel, Checkbox } from '@mui/material';
import { useQuizStore } from "../../stores/quiz";

export default function Employement() {
  const [employmentTypes, setEmploymentTypes] = useState({
    ...useQuizStore(state => state.employmentType)
});

  const updateStore = useQuizStore((state) => state.updateEmploymentType);

  const handleEmploymentChange = (event) => {
    const { name, checked } = event.target;
    const newType = {
        ...employmentTypes,
        [name]: checked
    }
    updateStore(newType);
    setEmploymentTypes((prevTypes) => ({
      ...prevTypes,
      [name]: checked,
    }));
    
  };

  console.log("Employement: ", employmentTypes);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        What type of employment are you interested in?
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Employment Types</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              name="fullTime"
              checked={employmentTypes.fullTime}
              onChange={handleEmploymentChange}
            />
          }
          label="Full Time"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="contract"
              checked={employmentTypes.contract}
              onChange={handleEmploymentChange}
            />
          }
          label="Contract"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="temporary"
              checked={employmentTypes.temporary}
              onChange={handleEmploymentChange}
            />
          }
          label="Temporary"
        />
      </FormControl>
    </Box>
  );
}
