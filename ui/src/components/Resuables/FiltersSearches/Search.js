import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import React, { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  search: {
    width: 300,
    margin: "40px 0px 40px 40px"
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const [value, setvalue] = useState("");
  useEffect(() => {
    if (props.searchValue !== value) setvalue(props.searchValue);
  });

  return (
    <FormControl className={classes.search}>
      <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        value={value}
        onChange={e => props.search(e.target.value)}
        type="search"
      />
    </FormControl>
  );
}
