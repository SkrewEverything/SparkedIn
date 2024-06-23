"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useQuery } from "@tanstack/react-query";

export default function UsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://127.0.0.1:5000/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  const handleSelectUser = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    alert(`${user.name} has been added to local storage`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data)

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>DEV Area: Users to select as current logged in user. Select a user when running for 1st time</Typography>
      <List>
        {data.map((user) => (
          <ListItem key={user.userId} sx={{ mb: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '8px' }}>
            <ListItemText primary={user.name} secondary={JSON.stringify(user)} />
            <Button variant="contained" color="primary" onClick={() => handleSelectUser(user)}>
              Select User
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
