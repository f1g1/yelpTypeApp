import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddReviewForm from "./AddReviewForm";
import ReviewsList from "../../Cards/ReviewsList";

export const useStyles = makeStyles(theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  paper: {
    overflowX: "hidden",
    top: "10%",
    height: "80%",
    left: "15%",
    position: "relative",
    justifySelf: "center",
    width: "70%",
    background: "#f2f2f2",
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: "25px",
    display: "flex",
    overflow: "scroll"
  },
  comments: {
    flex: 1,
    flexGrow: "50",
    flexDirection: "column"
  },
  close: {
    top: "5px",
    right: "0px",
    borderRadius: "0px",
    position: "absolute !important",
    padding: "0px"
  }
}));

export default function AddReview(props) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div className={classes.paper}>
        <AddReviewForm
          handleClose={props.handleClose}
          placeId={props.placeId}
          handleRefresh={props.handleRefresh}
        />
        <div className={classes.comments}>
          <ReviewsList noFilter={true} reviews={props.reviews} />
        </div>
        <Button className={classes.close}>
          <CloseIcon />
        </Button>
      </div>
    </Modal>
  );
}
