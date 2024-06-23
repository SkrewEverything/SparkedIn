// "use client";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import { Typography, ListItem } from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import Collapse from "@mui/material/Collapse";

// export default function CountrySelect() {
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <Autocomplete
//         fullWidth
//         multiple
//         id="country-select-demo"
//         options={locationsList}
//         autoHighlight
//         getOptionLabel={(option) => option.label}
//         renderOption={(props, option) => (
//           <Box
//             component="li"
//             sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
//             {...props}
//           >
//             <img
//               loading="lazy"
//               width="20"
//               srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//               src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//               alt=""
//             />
//             {option.label}
//           </Box>
//         )}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Select your preferred locations"
//             inputProps={{
//               ...params.inputProps,
//               autoComplete: "new-password", // disable autocomplete and autofill
//             }}
//           />
//         )}
//       />
//     </>
//   );
// }

// // From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
// const countries = [
//   {
//     code: "CA",
//     label: "Canada",
//   },
//   { code: "IN", label: "India" },
//   {
//     code: "US",
//     label: "United States",
//   },
// ];

// const states = {
//   US: ["California", "Texas", "Arkansas"],
//   IN: ["Karnataka"],
//   CA: ["Ontario"],
// };

// const citiesInStates = {
//   California: ["Sunnyvale", "San Bruno"],
//   Texas: ["Dallas"],
//   Karnataka: ["Bengaluru"],
//   Ontario: ["Mississauga"],
//   Arkansas: ["Bentonville"],
// };

// function getListOfLocations() {
//   let locations = [...countries];

//   countries.forEach((countriesObj) => {
//     states[countriesObj.code].forEach((state) => {
//       locations.push({
//         code: countriesObj.code,
//         label: state + ", " + countriesObj.label,
//       });

//       citiesInStates[state].forEach((city) => {
//         locations.push({
//           code: countriesObj.code,
//           label: city + ", " + state + ", " + countriesObj.label,
//         });
//       });
//     });
//   });
//   return locations;
// }

// const locationsList = getListOfLocations();


"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import {useQuizStore} from "../../stores/quiz";

export default function CountrySelect() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const updateStore = useQuizStore((state) => state.updateLocations);
  console.log("Locations: ", selectedLocations);

  const handleLocationChange = (event, newValue) => {
    setSelectedLocations(newValue);
    updateStore(newValue)
    
  };

  return (
    <>
      <Autocomplete
        fullWidth
        multiple
        id="country-select-demo"
        options={locationsList}
        autoHighlight
        value={selectedLocations}
        onChange={handleLocationChange}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select your preferred locations"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </>
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  {
    code: "CA",
    label: "Canada",
  },
  { code: "IN", label: "India" },
  {
    code: "US",
    label: "United States",
  },
];

const states = {
  US: ["California", "Texas", "Arkansas"],
  IN: ["Karnataka"],
  CA: ["Ontario"],
};

const citiesInStates = {
  California: ["Sunnyvale", "San Bruno"],
  Texas: ["Dallas"],
  Karnataka: ["Bengaluru"],
  Ontario: ["Mississauga"],
  Arkansas: ["Bentonville"],
};

function getListOfLocations() {
  let locations = [...countries];

  countries.forEach((countriesObj) => {
    states[countriesObj.code].forEach((state) => {
      locations.push({
        code: countriesObj.code,
        label: state + ", " + countriesObj.label,
      });

      citiesInStates[state].forEach((city) => {
        locations.push({
          code: countriesObj.code,
          label: city + ", " + state + ", " + countriesObj.label,
        });
      });
    });
  });
  return locations;
}

const locationsList = getListOfLocations();
