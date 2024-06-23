"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationFilter from "../../components/Filter/LocationFilter";
import SkillsFilter from "../../components/Filter/SkillsFilter";
import JobFamilyFilter from "../../components/Filter/JobFamilyFilter";
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
} from "@mui/material";

const steps = [
  "Select your locations",
  "Education",
  "Employement Type",
  "Skills",
  "Job Family",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [components, setComponents] = React.useState([
    Location(),
    Education(),
    Employement(),
    Skills(),
    JobFamily(),
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function GetLocation() {
    return (
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <LocationFilter />
      </Box>
    );
  }

  function Location() {
    return (
      <>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Let's start with your preferred locations
        </Typography>
        <GetLocation />
      </>
    );
  }

  function Education() {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          What is your highest level of education?
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Education Level</FormLabel>
          <RadioGroup
            aria-labelledby="education-level-group-label"
            defaultValue="bachelors"
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
  function Employement() {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          What type of employment are you interested in?
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Employment Types</FormLabel>
          <FormControlLabel
            control={<Checkbox name="full-time" />}
            label="Full Time"
          />
          <FormControlLabel
            control={<Checkbox name="contract" />}
            label="Contract"
          />
          <FormControlLabel
            control={<Checkbox name="temporary" />}
            label="Temporary"
          />
        </FormControl>
      </Box>
    );
  }

  function Skills() {
    return (
      <>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Select your skills
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <SkillsFilter />
        </Box>
      </>
    );
  }

  function JobFamily() {
    return (
      <>
        <JobFamilyFilter />
      </>
    );
  }

  function StepperContent() {
    return (
      <React.Fragment>
        <Stack
          direction="column"
          spacing={4}
          sx={{ mt: 4, mb: 4, alignItems: "center" }}
        >
          {components[activeStep]}
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 2, px: 4, py: 1.5 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ px: 4, py: 1.5 }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    );
  }

  console.log(components);

  return (
    <Container>
      <Box sx={{ width: "100%", mt: 5 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color:
                        activeStep === index
                          ? "primary.main"
                          : "text.secondary",
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {/* Content of the Stepper */}
        <Box sx={{ mt: 4 }}>
          {activeStep === steps.length ? <Done /> : <StepperContent />}
        </Box>
      </Box>
    </Container>
  );
}

function Done() {
  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography
          sx={{ mt: 2, mb: 1 }}
          variant="h1"
          fontWeight="bold"
          align="center"
        >
          Congratulations! 🎉
        </Typography>
        <Typography
          sx={{ mt: 2, mb: 1 }}
          variant="h5"
          fontWeight="bold"
          align="center"
        >
          Now let's see what we can find for you based on your options
        </Typography>
        <Button size="large" href="/search">
          Back to home
        </Button>
      </Stack>
    </>
  );
}
