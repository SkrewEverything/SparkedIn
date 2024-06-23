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
import {useQuizStore} from "../../stores/quiz";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const [open, setOpen] = React.useState(true);
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const updateStore = useQuizStore((state) => state.updateSkills);
  console.log("Skills: ", selectedSkills);

  const handleSkillChange = (event, newValue) => {
    setSelectedSkills(newValue);
    updateStore(newValue);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Autocomplete
        fullWidth
        multiple
        id="tags-filled"
        options={options.map((option) => option)}
        freeSolo
        value={selectedSkills}
        onChange={handleSkillChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip variant="outlined" label={option} key={key} {...tagProps} />
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
    </>
  );
}

const options = [
  "Kafka",
  "Java",
  "Spring Boot",
  "Redis",
  "Cassandra",
  "Python",
  "Object Oriented Programming",
  "Backend",
  "React Native",
  "Amazon Web Services",
  "Web Applications",
  "MySQL",
  "Software Architecture",
  "MongoDB",
  "Gitlab",
  "Software Quality (SQA/SQC)",
  "Testability",
  "PostgreSQL",
  "Apache Kafka",
  "Azure DevOps",
  "User Interface (UI)",
  "Terraform",
  ".NET Framework",
  "Embedded Software",
  "Object-Oriented Design",
  "Agile Software Development",
  "Architectural Design",
  "Github",
  "Android (Operating System)",
  "Embedded Systems",
  "Spring Boot",
  "Go (Programming Language)",
  "Spring Framework",
  "Application Development",
  "Relational Database Management Systems",
  "Programming Tools",
  "Data Structures",
  "Extensible Markup Language (XML)",
];
