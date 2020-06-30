import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, TextareaAutosize, Grid } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditableImagePreviewer from "../../../Resuables/EditableImagePreviewer/ImagePreviewer";
import { DishService } from "../../../../services/DishService";

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
    left: "35%",
    position: "relative",
    justifySelf: "center",
    width: "30%",
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
function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export default function AddDish(props) {
  const [picture, setPicture] = React.useState([]);
  const [pictureBlob, setPictureBlob] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [description, setDescription] = useState();
  const classes = useStyles();

  let handleAdd = () => {
    DishService.Add({
      placeId: props.placeId,
      shortDescription,
      longDescription: description,
      image: pictureBlob
    });

    props.refreshDishes();
  };
  let handleImageChange = event => {
    let url = URL.createObjectURL(event.target.files[0]);
    setPicture(url);
    toDataUrl(url, x => setPictureBlob(x));
  };
  let deleteImage = key => {
    setPicture([]);
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div className={classes.paper}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} justify="center">
            {picture.length === 0 && (
              <Button
                color="secondary"
                variant="outlined"
                component="label"
                className={classes.addPhotoButton}
              >
                {" "}
                <AddAPhotoIcon />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </Button>
            )}
            {picture && (
              <EditableImagePreviewer
                image={picture}
                deleteImage={deleteImage}
              ></EditableImagePreviewer>
            )}
          </Grid>
          <Grid item xs={12} justify="center">
            <TextareaAutosize
              rows={4}
              aria-label="maximum height"
              placeholder="preview description"
              onChange={e => setShortDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} justify="center">
            <TextareaAutosize
              rows={7}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              placeholder="description"
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} justify="center">
            <Button color="primary" variant="contained" onClick={handleAdd}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
