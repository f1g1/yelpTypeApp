import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
export default function DatePicker(props) {
  useEffect(() => {
    if (props.value !== selectedDate) {
      setselectedDate(props.value);
    }
  });
  const [selectedDate, setselectedDate] = useState(null);
  const handleDateChange = date => {
    setselectedDate(date);
    props.handleDateChange(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
