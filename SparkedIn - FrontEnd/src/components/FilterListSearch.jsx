// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import Chip from "@mui/material/Chip";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import { ListSubheader, Typography, ListItem } from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import Collapse from "@mui/material/Collapse";

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
//             primary={<Typography variant="button">Skills</Typography>}
//           />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>

//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div">
//             <ListItem>
//               <Autocomplete
//               fullWidth
//                 multiple
//                 id="tags-filled"
//                 options={options.map((option) => option.title)}
//                 freeSolo
//                 renderTags={(value, getTagProps) =>
//                   value.map((option, index) => {
//                     const { key, ...tagProps } = getTagProps({ index });
//                     return (
//                       <Chip
//                         variant="outlined"
//                         label={option}
//                         key={key}
//                         {...tagProps}
//                       />
//                     );
//                   })
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                   fullWidth
//                     {...params}
//                     variant="outlined"
//                     label="Skills"
//                     placeholder="Type your skills..."
//                   />
//                 )}
//               />
//             </ListItem>
//           </List>
//         </Collapse>
//       </List>
//     </>
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const options = [
//   { title: "Kafka", id: "1", data: "any additional data" },
//   { title: "Java" },
//   { title: "Spring Boot" },
//   { title: "Redis" },
//   { title: "Cassandra" },
//   { title: "Python" },
//   { title: "Object Oriented Programming" },
//   { title: "Backend" },
//   { title: "React Native" },
// ];



import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheader, Typography, ListItem } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const options = [
  { title: "Kafka", id: "1", data: "any additional data" },
  { title: "Java" },
  { title: "Spring Boot" },
  { title: "Redis" },
  { title: "Cassandra" },
  { title: "Python" },
  { title: "Object Oriented Programming" },
  { title: "Backend" },
  { title: "React Native" },
];

export default function CheckboxesTags(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSkillsChange = (event, newValue) => {
    props.setSelectedSkills(newValue);
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemButton onClick={handleClick} dense>
          <ListItemText
            primary={<Typography variant="button">Skills</Typography>}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem>
              <Autocomplete
                fullWidth
                multiple
                id="tags-filled"
                options={options.map((option) => option.title)}
                freeSolo
                value={props.selectedSkills}
                onChange={handleSkillsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        key={key}
                        {...tagProps}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    variant="outlined"
                    label="Skills"
                    placeholder="Type your skills..."
                  />
                )}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}
