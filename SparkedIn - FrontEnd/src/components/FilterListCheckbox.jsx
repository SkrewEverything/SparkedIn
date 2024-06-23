import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {ListSubheader, Typography} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export default function CheckboxList(props) {
  const [open, setOpen] = React.useState(true);

  console.log("PROPS", props);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = (value) => () => {
    const currentIndex = props.checked.indexOf(value);
    const newChecked = [...props.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    props.setChecked(newChecked);
  };

  console.log("EMPLOYEMENT: ", props.checked);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} dense disablePadding >
      <ListItemButton onClick={handleClick} dense>
        <ListItemText primary={<Typography variant='button'>{props.title}</Typography>} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
            {props.options.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="end"
                                checked={props.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
      </Collapse>
    </List>
  );
}

