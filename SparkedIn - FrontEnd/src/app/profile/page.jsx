import React from 'react';
import { Box, Avatar, Typography, Chip, Button, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProfilePage() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Profile Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar alt="Profile Picture" src="/path/to/image.jpg" sx={{ width: 100, height: 100, mr: 2 }} />
        <Box>
          <Typography variant="h4">John Doe</Typography>
          <Typography variant="subtitle1" color="textSecondary">Software Engineer</Typography>
        </Box>
      </Box>

      {/* Location Preferences */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">Location Preferences</Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="New York" variant="outlined" />
          <Chip label="San Francisco" variant="outlined" sx={{ ml: 1 }} />
          <Chip label="Remote" variant="outlined" sx={{ ml: 1 }} />
        </Box>
      </Box>

      {/* Resumes */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">Resumes</Typography>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Resume
          <input type="file" hidden />
        </Button>
        <List>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="John_Doe_Resume.pdf" secondary="Uploaded on 2023-05-01" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>

      {/* Skills List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">Skills</Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="JavaScript" color="primary" />
          <Chip label="React" color="primary" sx={{ ml: 1 }} />
          <Chip label="Node.js" color="primary" sx={{ ml: 1 }} />
          <Chip label="Python" color="primary" sx={{ ml: 1 }} />
        </Box>
      </Box>

      {/* Education */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">Education</Typography>
        <List>
          <ListItem>
            <ListItemText primary="B.Sc. in Computer Science" secondary="University of XYZ, 2015-2019" />
          </ListItem>
          <ListItem>
            <ListItemText primary="M.Sc. in Data Science" secondary="University of ABC, 2019-2021" />
          </ListItem>
        </List>
      </Box>

      {/* Experience */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">Experience</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Software Engineer" secondary="Tech Company, 2021-Present" />
            <Typography variant="body2" color="textSecondary">Developed and maintained web applications using React and Node.js.</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Junior Developer" secondary="Another Tech Company, 2019-2021" />
            <Typography variant="body2" color="textSecondary">Worked on backend services using Python and Django.</Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
