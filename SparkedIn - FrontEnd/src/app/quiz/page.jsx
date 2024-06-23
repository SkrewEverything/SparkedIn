"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationFilter from "./Location";
import SkillsFilter from "./Skills";
import Education from "./Education";
import Employement from "./Employement";
import JobFamily from "./JobFamily";
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

import { useQuizStore } from "../../stores/quiz";

const steps = [
  "Select your locations",
  "Education",
  "Employement Type",
  "Skills",
  "Job Family",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const store = useQuizStore();
  console.log("Quiz Store: ", store);

  const submit = async () => {
    console.log("Submit: ", store)
    const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    console.log(selectedUser)
    const payload = {
      userId: selectedUser.userId,
      skills: store.skills.join(", "),
      experience: selectedUser.years_experience,
      employement_type: getTrueKeys(store.employmentType).join(", "),
      locations: store.locations.map((val) => val.label).join(", "),
      education: store.education,
      job_family: store.jobFamily.join(", ")
    };

    const response = await fetch("http://127.0.0.1:5000/api/interested_pool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();

    console.log("Payload: ", payload);
  }

  function getTrueKeys(obj) {
    return Object.keys(obj).filter(key => obj[key] === true);
  }

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

  function Content() {
    switch (activeStep) {
      case 0:
        return <Location />;
      case 1:
        return <Education />;
      case 2:
        return <Employement />;
      case 3:
        return <Skills />;
      case 4:
        return <JobFamily />;
      default:
        return <Location />;
    }
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

  function StepperContent() {
    return (
      <React.Fragment>
        <Stack
          direction="column"
          spacing={4}
          sx={{ mt: 4, mb: 4, alignItems: "center" }}
        >
          <Content />
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
          {activeStep === steps.length - 1 ? (<Button color="success" onClick={() => {
            handleNext();
            submit();
          }}>Submit</Button>) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ px: 4, py: 1.5 }}
          >
            Next
          </Button>)}
        </Box>
      </React.Fragment>
    );
  }


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
