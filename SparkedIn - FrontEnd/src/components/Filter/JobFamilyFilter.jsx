import * as React from "react";
import { Typography, FormControl, FormLabel, FormControlLabel, Checkbox, Box, Button, Stack } from "@mui/material";

const jobFamilies = [
  "Business operations",
  "Business services",
  "Communications and corporate affairs",
  "Compliance, ethics, and legal",
  "Continuous improvement",
  "Data analytics and management",
  "Engineering and design",
  "Finance",
  "General and retail management",
  "Healthcare",
  "Investigations and security",
  "Maintenance",
  "Manufacturing and printing",
  "Officers",
  "Other",
  "People",
  "PMO",
  "Purchasing",
  "Realty",
  "Research and development",
  "Sales, marketing and business development",
  "Supply chain",
  "Support services"
];

function JobFamilies() {
  const [selectedJobFamilies, setSelectedJobFamilies] = React.useState([]);

  const handleJobFamilyChange = (event) => {
    const value = event.target.value;
    setSelectedJobFamilies((prev) =>
      prev.includes(value) ? prev.filter((jobFamily) => jobFamily !== value) : [...prev, value]
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Job Families
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        What job families are you interested in? Select all that apply or skip.
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Job Families</FormLabel>
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2, borderRadius: 2 }}>
          {jobFamilies.map((jobFamily) => (
            <Stack direction="row">
            <FormControlLabel
              key={jobFamily}
              control={
                <Checkbox
                  value={jobFamily}
                  checked={selectedJobFamilies.includes(jobFamily)}
                  onChange={handleJobFamilyChange}
                />
              }
              label={jobFamily}
            />
            </Stack>
            
          ))}
        </Box>
      </FormControl>
    </Box>
  );
}

export default JobFamilies;
