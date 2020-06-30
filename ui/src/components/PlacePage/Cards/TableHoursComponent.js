import React from "react";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import * as S from "./GeneralInfoCardStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles(theme =>
  createStyles({
    head: {
      backgroundColor: "rgba(0,0,0,0.1)",
      color: theme.palette.common.black
    },
    body: {
      fontStyle: "bolder",
      fontSize: "17px"
    }
  })
)(TableCell);

const useStyles = makeStyles(theme => ({
  CurrentDay: {
    background: theme.palette.primary[500],
    fontStyle: "bolder; !important",
    fontSize: "20px; !important"
  }
}));
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
export default function TableHoursComponent(props) {
  const classes = useStyles();
  let date = new Date();

  return (
    <S.Table>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Day of the week</StyledTableCell>
            <StyledTableCell align="center">Starting hours</StyledTableCell>
            <StyledTableCell align="center">Closing hours</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day, index) => (
            <TableRow
              key={"day" + index}
              className={
                date.getDay() === (index + 1) % 7 ? classes.CurrentDay : ""
              }
            >
              <TableCell component="th" scope="row">
                {day}
              </TableCell>
              <TableCell align="center">{props.hours[index].open}</TableCell>
              <TableCell align="center">{props.hours[index].close}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </S.Table>
  );
}
