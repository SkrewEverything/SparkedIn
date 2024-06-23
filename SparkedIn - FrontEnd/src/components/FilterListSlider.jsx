// import * as React from "react";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";;
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import { Typography, ListItem } from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import Collapse from "@mui/material/Collapse";
// import {Slider} from "@mui/material";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// export default function CheckboxesTags() {
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//         <ListItemButton onClick={handleClick} dense>
//           <ListItemText
//             primary={<Typography variant="button">Experience</Typography>}
//           />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>

//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div">
//             <ListItem>
//               <Slider
//                 defaultValue={1}
//                 valueLabelDisplay="auto"
//                 shiftStep={1}
//                 step={1}
//                 marks={marks}
//                 min={0}
//                 max={15}
//               />
//             </ListItem>
//           </List>
//         </Collapse>
//       </List>
//     </>
//   );
// }

// const marks = [
//     {value: 1, label: "1"},
//     {value: 3, label: "3"},
//     {value: 5, label: "5"},
//     {value: 8, label: "8"},
//     {value: 15, label: "15+"},
// ]


import * as React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography, ListItem } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Slider } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const marks = [
  { value: 1, label: "1" },
  { value: 3, label: "3" },
  { value: 5, label: "5" },
  { value: 8, label: "8" },
  { value: 15, label: "15+" },
];

export default function CheckboxesTags(props) {
  const [open, setOpen] = React.useState(true);
  

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSliderChange = (event, newValue) => {
    props.setExperience(newValue);
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemButton onClick={handleClick} dense>
          <ListItemText
            primary={<Typography variant="button">Experience</Typography>}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem>
              <Slider
                value={props.experience}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={15}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}
