"use client";

import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiCardContent-root': {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiButton-root': {
    color: theme.palette.primary.main,
  },
}));

const JobCard = ({ title, company, location, description }) => {
  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {company}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {location}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </CustomCard>
  );
};

export default JobCard;
