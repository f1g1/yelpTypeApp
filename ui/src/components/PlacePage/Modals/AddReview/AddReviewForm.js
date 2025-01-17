import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {
  TextareaAutosize,
  Tooltip,
  Button,
  TextField
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ReviewService } from "../../../../services/ReviewService";
import EditableImagePreviewer from "../../../Resuables/EditableImagePreviewer/ImagePreviewer";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { AuthContext } from "../../../../App";
import { ImageService } from "../../../../services/ImageService";
import { toDataUrl } from "../../../Resuables/GeneralMethods";

const StyledRating = withStyles({
  iconFilled: {
    color: "#005858 "
  },
  iconHover: {
    color: "#005858 "
  }
})(Rating);

export const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%",
    marginBottom: "20px"
  },
  addPhotoButton: {
    borderRadius: "0px",
    marginRight: "15px"
  },
  textArea: {
    fontSize: "1em",
    marginTop: "50px",
    width: "100%",
    marginBottom: "50px"
  },
  title: {
    overflowY: "auto",
    overflowX: "hidden",
    top: "0px",
    flex: 1,
    padding: "0px 10px",
    flexGrow: 30,
    flexDirection: "column",
    position: "sticky",
    margin: "0 20px"
  }
}));

const labels = {
  1: "Poor!",
  2: "Ok!",
  3: "Good!",
  4: "Very Good!",
  5: "Excellent!"
};
function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip arrow title={labels[value] || ""}>
      <span {...other} />
    </Tooltip>
  );
}

export default function AddReviewForm(props) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [blop, setBlop] = useState([]);
  const [text, settext] = useState("");
  const [tags, settags] = useState("");
  const classes = useStyles();
  const auth = React.useContext(AuthContext);
  // let handleImageChange = event => {
  //   let images = [];
  //   Object.entries(event.target.files).forEach(x =>
  //     images.push(URL.createObjectURL(x[1]))
  //   );
  //   console.log("imgs", images);
  //   setPictures([...pictures, ...images]);
  //
  // };
  let handleImageChange = event => {
    let urls = [];
    let files = [...event.target.files];
    files.forEach(x => urls.push(URL.createObjectURL(x)));

    urls.forEach(url =>
      toDataUrl(url, x => {
        setBlop([...blop, x]);
      })
    );
  };
  let deleteImage = key => {
    let auxPictures = [];
    blop.forEach((x, i) => {
      if (i !== key) auxPictures.push(x);
    });
    setBlop(auxPictures);
  };
  let handleSumbit = () => {
    let x = blop;
    let images = [];
    blop.forEach(element => {
      images.push(ImageService.AddBlop(element));
    });

    let review = {
      rating: value,
      text: text,
      tags: tags,
      userId: auth.userId,
      score: 0,
      place: props.placeId
    };
    if (images.length !== 0) {
      review.images = images;
    }

    ReviewService.Add(review);
    props.handleRefresh();
    props.handleClose();
  };

  return (
    <div className={classes.title}>
      <h2 id="simple-modal-title">How was your experience?</h2>
      <Box>
        <StyledRating
          size="large"
          name="customized-color"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          precision={1}
          IconContainerComponent={IconContainer}
        />
      </Box>
      <TextareaAutosize
        resize="none"
        className={classes.textArea}
        rowsMax={30}
        aria-label="minimum height"
        rows={10}
        placeholder="Tell us about your experience"
        value={text}
        onChange={x => settext(x.target.value)}
      />
      <TextField
        multiline
        className={classes.textField}
        id="standard-basic"
        value={tags}
        placeholder="Each space separated group will be considered a tag"
        onChange={x => settags(x.target.value)}
      />
      {blop &&
        blop.map((image, i) => (
          <EditableImagePreviewer
            image={image}
            id={i}
            deleteImage={deleteImage}
          ></EditableImagePreviewer>
        ))}
      <Box>
        <Button
          color="primary"
          className={classes.addPhotoButton}
          variant="contained"
          onClick={handleSumbit}
        >
          Submit
        </Button>
        <Tooltip title="Add a photo!">
          <Button
            color="secondary"
            variant="outlined"
            component="label"
            className={classes.addPhotoButton}
          >
            <AddAPhotoIcon />
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
}
