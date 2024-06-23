"use client";

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterListCheckbox from "../FilterListCheckbox";
import FilterListSearch from "../FilterListSearch";
import FilterListSlider from "../FilterListSlider";
import FilterListLocation from "../FilterListLocation";
import { Button } from "@mui/material";
import { Search, Dashboard, BugReport, Add } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import {useJobStore} from "../../stores/jobs";

const drawerWidth = 350;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [employementChecked, employementSetChecked] = React.useState([]);
  const [educationChecked, educationSetChecked] = React.useState([]);
  const [organizationChecked, organizationSetChecked] = React.useState([]);
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const [experience, setExperience] = React.useState(1);
  const updateStore = useJobStore((state) => state.updateJobs);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleSubmit = async () => {
    console.log(employementChecked, educationChecked, organizationChecked, selectedSkills, selectedLocations);
    const payload = {
      employementType: employementChecked,
      educations: educationChecked,
      organizations: organizationChecked,
      skills: selectedSkills,
      locations: selectedLocations,
      experience: experience
    }

    console.log(payload)
    const data = await filterApplications(payload)
    updateStore(data);
    console.log("UPDATED FILTER: ", data);
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/* Search */}
        <ListItem disablePadding>
          <ListItemButton href="/search">
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Search Jobs" />
          </ListItemButton>
        </ListItem>

        {/* Search Candidate */}
        <ListItem disablePadding>
          <ListItemButton href="/search-candidate">
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Search Candidate" />
          </ListItemButton>
        </ListItem>

        {/* Add a job */}
        <ListItem disablePadding>
          <ListItemButton href="/add-job">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Job" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        {/* Requests */}
        <ListItem disablePadding>
          <ListItemButton href="/requests">
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary="Requests" />
          </ListItemButton>
        </ListItem>

        {/* Applications */}
        <ListItem disablePadding>
          <ListItemButton href="/applications">
            <ListItemIcon>
              <InsertDriveFileIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItemButton>
        </ListItem>

        {/* Saved Jobs */}
        <ListItem disablePadding>
          <ListItemButton href="/saved">
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Saved Jobs" />
          </ListItemButton>
        </ListItem>

        {/* Profile */}
        <ListItem disablePadding>
          <ListItemButton href="/profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        {/* Report a Bug */}
        <ListItem disablePadding>
          <ListItemButton href="/bug-report">
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary="Report a Bug" />
          </ListItemButton>
        </ListItem>
      </List>
      {props.showFilter && (
        <>
          <Divider />
          <FilterListSearch 
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
          <FilterListLocation 
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          />
          <FilterListCheckbox
            title="Organization"
            options={["Sams Club", "Walmart"]}
            checked={organizationChecked} 
            setChecked={organizationSetChecked}
          />
          <FilterListCheckbox
            title="Degree"
            options={[
              "No degree",
              "Associate",
              "Bachelor's",
              "Master's",
              "Ph.D.",
            ]}
            checked={educationChecked} 
            setChecked={educationSetChecked}
          />
          <FilterListSlider 
          experience={experience}
          setExperience={setExperience} />
          <FilterListCheckbox
            title="Job Types"
            options={["Full-Time", "Contract", "Temporary"]}
            checked={employementChecked} 
            setChecked={employementSetChecked}

          />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", padding:5 }}
            dense
            disablePadding
          >
            <Button variant="contained" disableElevation fullWidth onClick={handleSubmit}>Apply Filters</Button>
          </List>
        </>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="transparent"
        variant="elevation"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
          SparkedIn
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" disableElevation href="/quiz">
            Get discovered!
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

const glassAppBarStyles = {
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
};

export default ResponsiveDrawer;


async function filterApplications(payload) {
  

  try {
      const response = await fetch('http://localhost:5000/api/filter_applications/' + JSON.parse(localStorage.getItem("selectedUser")).userId, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Filtered Applications:', data);
      return data;
  } catch (error) {
      console.error('Error:', error);
  }
}