import React, { useRef, useState, useEffect } from "react";
import * as S from "./GeneralInfoCardStyles";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import GradeIcon from "@material-ui/icons/Grade";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ShareIcon from "@material-ui/icons/Share";
import AddReview from "../Modals/AddReview/AddReview";
import WebIcon from "@material-ui/icons/Web";
import PinDropIcon from "@material-ui/icons/PinDrop";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactInfo from "../Modals/ContactInfo";
import { handleOpenNow, toDataUrl } from "../../Resuables/GeneralMethods";
import TableHoursComponent from "./TableHoursComponent";
import ReviewsList from "./ReviewsList";
import EventIcon from "@material-ui/icons/Event";
import { ReviewService } from "../../../services/ReviewService";
import { ImageService } from "../../../services/ImageService";
import { PlaceService } from "../../../services/PlaceService";

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const StyledRating = withStyles({
  iconFilled: {
    color: "#008080"
  },
  iconHover: {
    color: "#008080"
  }
})(Rating);

const useStyles = makeStyles(theme => ({
  squareButton: {
    marginRight: "20px"
  },
  generalInfo: {
    // margin: "3% 40% 3% 2%"
  },

  mainButtons: {
    width: "50%",
    margin: "auto"
  },
  buttonIcon: {
    marginRight: "5px"
  }
}));

function GeneralInfoCard(props) {
  const [openAddReview, setOpenReview] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [reviews, setreviews] = useState();
  const [picturesUrls, setPicturesUrls] = useState([]);
  const [blop, setBlop] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const myRef = useRef(null);

  useEffect(() => {
    handleRefreshReviews();
  }, []);
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const classes = useStyles();

  const ScrollDemo = value => {
    scrollToRef(myRef);
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpen(true);
  };
  const handleOpenReview = () => {
    setOpenReview(true);
  };
  const handleCloseReview = () => {
    setOpenReview(false);
  };
  const handleOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  let handleRefreshReviews = () => {
    let x = [...ReviewService.getReviewsForPlace(props.place.id)];
    setreviews(x);
    debugger;
  };
  let handleSearchChanged = val => {
    debugger;
    if (val != searchValue) setSearchValue(val);
  };
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
  useEffect(() => {
    let images = [];

    if (blop.length !== 0) {
      blop.forEach(element => {
        images.push(ImageService.AddBlop(element));
      });
      let placeU = props.place;
      placeU.images = [...placeU.images, ...images];

      PlaceService.Update(placeU);
      setBlop([]);
      props.handleRefreshImages();
    }
  }, [blop]);

  return (
    <>
      <Paper elevation={1} square className={classes.generalInfo}>
        <S.Line>
          <S.EffectiveContainer>
            <S.TitleContainer>
              <S.Title>{props.place.title}</S.Title>
              {handleOpenNow(props.place.hours) ? (
                <S.OpenStatus>Open now!</S.OpenStatus>
              ) : (
                <S.OpenStatus closed>Closed now!</S.OpenStatus>
              )}
            </S.TitleContainer>
            <S.Line>
              <Tooltip title="Current Rating is:">
                <StyledRating
                  readOnly
                  name="customized-color"
                  value={props.place.rating / props.place.ratings}
                  precision={0.2}
                  size={"large"}
                  icon={<GradeIcon fontSize="inherit" />}
                />
              </Tooltip>
            </S.Line>
            <S.ButtonsRow>
              <Tooltip title="Add a review!">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleOpenReview}
                  className={classes.squareButton}
                >
                  <RateReviewIcon className={classes.buttonIcon} />
                  Review
                </Button>
              </Tooltip>
              <Tooltip title="Add a photo!">
                <Button
                  color="secondary"
                  variant="contained"
                  component="label"
                  className={classes.squareButton}
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
              <Tooltip
                PopperProps={{
                  disablePortal: true
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Link copied to clipboard!"
              >
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.squareButton}
                  onClick={handleTooltipOpen}
                >
                  <ShareIcon className={classes.buttonIcon} />
                </Button>
              </Tooltip>
            </S.ButtonsRow>
            <S.Category>{" " + props.place.category}</S.Category>
          </S.EffectiveContainer>
          <S.EffectiveContainer>
            <S.Button
              className={classes.mainButtons}
              onClick={handleOpenInfo}
              color="primary"
            >
              <ContactPhoneIcon className={classes.buttonIcon} />
              {"Contact"}
            </S.Button>
            <S.Button
              onClick={() =>
                (window.location.href = `https://www.google.com/maps/dir//${props.place.location.lat},${props.place.location.lng}`)
              }
              className={classes.mainButtons}
            >
              <PinDropIcon className={classes.buttonIcon} />
              Get directions
            </S.Button>

            <S.Button
              className={classes.mainButtons}
              onClick={() =>
                (window.location.href = `http://www.gandhicluj.ro/`)
              }
            >
              <WebIcon className={classes.buttonIcon} />
              Go To Site
            </S.Button>

            <S.Button
              className={classes.mainButtons}
              onClick={() =>
                // (window.location.href = `https://calendar.google.com/calendar/r/eventedit?&text=${props.place.title}&details=Reservation made in maybe I pass`)
                (window.location.href = `https://calendar.google.com/calendar/r/eventedit?&text=${props.place.title}&location=${props.place.location.lat},${props.place.location.lng}&details=Reservation made in maybe I pass`)
              }
            >
              <EventIcon className={classes.buttonIcon} />
              Add to Google Calendar
            </S.Button>
          </S.EffectiveContainer>
        </S.Line>
        {/* //////////////////////////////////////////to here is first segnemt of the card */}
        <S.Line>
          <S.EffectiveContainer>
            <TableHoursComponent hours={props.place.hours} />
          </S.EffectiveContainer>
          <S.EffectiveContainerBeggining>
            <S.Subtitle color="secondary">#PopularTags:</S.Subtitle>
            <S.PopularTagsList onClick={ScrollDemo}>
              {props.place.popular_tags.map((x, index) => (
                <Tooltip key={x.value + index} title={x.nr} placement="right">
                  <S.PopularTagsLi onClick={() => handleSearchChanged(x.value)}>
                    {x.value}
                  </S.PopularTagsLi>
                </Tooltip>
              ))}
            </S.PopularTagsList>
          </S.EffectiveContainerBeggining>
        </S.Line>
        <S.Line>
          <S.EffectiveContainerBeggining>
            <S.Subtitle>Description</S.Subtitle>
            <S.Description>{props.place.description}</S.Description>
          </S.EffectiveContainerBeggining>
        </S.Line>
        <div ref={myRef}>
          {reviews && (
            <ReviewsList
              placeId={props.place.id}
              reviews={reviews}
              handleRefresh={handleRefreshReviews}
              searchValue={searchValue}
              handleSearchChanged={handleSearchChanged}
            />
          )}
        </div>
      </Paper>

      <AddReview
        placeId={props.place && props.place.id}
        open={openAddReview}
        handleClose={handleCloseReview}
        handleRefresh={handleRefreshReviews}
        reviews={reviews}
      />
      <ContactInfo
        open={openInfo}
        handleClose={handleCloseInfo}
        place={props.place}
      ></ContactInfo>
    </>
  );
}

export default GeneralInfoCard;
