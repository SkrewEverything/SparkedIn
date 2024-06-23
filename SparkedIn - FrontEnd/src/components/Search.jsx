"use client";
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '56px', // Increase height
    fontSize: '1.2rem', // Increase font size
    '& .MuiInputAdornment-root': {
      fontSize: '1.2rem', // Increase font size of adornment
    },
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const EnhancedSearchBar = () => {
  return (
    <CustomTextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      fullWidth
      variant="outlined"
      size="medium"
      placeholder="Search for JobID, Skills, etc."
    />
  );
};

export default EnhancedSearchBar;
