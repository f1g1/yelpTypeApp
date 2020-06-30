import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: 300,
    margin: "40px 0px 40px 40px"
  }
}));

export default function StarsDropdown(props) {
  const [value, setvalue] = useState("");
  useEffect(() => {
    if (props.value !== value) {
      setvalue(props.value);
    }
  });
  const classes = useStyles();
  let handleChange = e => {
    let stars = e.target.value;
    setvalue(stars);
    props.filterStars(stars);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Rating</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        value={value}
      >
        <MenuItem value={1}>
          <StarIcon />
        </MenuItem>
        <MenuItem value={2}>
          <StarIcon />
          <StarIcon />
        </MenuItem>
        <MenuItem value={3}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </MenuItem>
        <MenuItem value={4}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </MenuItem>
        <MenuItem value={5}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </MenuItem>
      </Select>
    </FormControl>
  );
}
