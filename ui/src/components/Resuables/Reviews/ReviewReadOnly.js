import React, { useState, useEffect, useContext } from "react";
import * as S from "./ReviewStyle";
import Rating from "@material-ui/lab/Rating";
import GradeIcon from "@material-ui/icons/Grade";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Gallery from "react-grid-gallery";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Paper } from "@material-ui/core";
import { theme } from "../Theme";
import CustomizedMenus from "./ControlledMenu";
import { AuthContext } from "../../../App";
import { ImageService } from "../../../services/ImageService";
import DateComponent from "./DateComponent";
import { UserService } from "../../../services/UserService";
import { ReviewService } from "../../../services/ReviewService";
const StyledRating = withStyles({
  iconFilled: {
    color: "#005858 "
  },
  iconHover: {
    color: "#005858 "
  }
})(Rating);

const useStyles = makeStyles(props => ({
  Like: props => ({
    background: props.liked ? "rgba(0,0,0,0.1)" : "",
    margin: "5px",
    color: "grey",
    borderRadius: "0%",
    "&:hover": {
      color: theme.palette.primary[500],
      cursor: "pointer"
    }
  }),

  Score: props => ({
    color: props.score > 0 ? "darkcyan" : "darkred",
    padding: "7px",
    cursor: "default",
    borderRadius: "0px"
  }),
  paper: {
    padding: "10px",
    psotion: "relative",
    width: "98%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column"
  }
}));

function ReviewReadOnly(props) {
  const classes = useStyles(props);
  const [showPhotos, setshowPhotos] = useState(false);
  const [tags, settags] = useState();
  const [photos, setphotos] = useState();
  const [rated, setRated] = useState(
    UserService.getCurrentUser()
      ? props.review.usersThatScored.includes(UserService.getCurrentUser().id)
      : undefined
  );
  useEffect(() => {
    console.log("ReviewIReceive", props.review);
    settags(props.review.tags.split("#").splice(1));
  }, [props.review]);

  const context = useContext(AuthContext);

  let handleThumbUp = () => {
    let newUsersThatScored = [
      ...props.review.usersThatScored,
      UserService.getCurrentUser() ? UserService.getCurrentUser().id : undefined
    ];
    if (!rated) {
      setRated(true);
      let toUpdateReview = {
        ...props.review,
        score: props.review.score + 1
      };
      toUpdateReview.usersThatScored = newUsersThatScored;
      ReviewService.Update(toUpdateReview);
      props.handleRefresh();
    }
  };
  let handlePhotos = () => {
    setphotos(ImageService.getImagesReviewObject(props.review.images));
    console.log("sfkdskf");
    setshowPhotos(true);
  };

  return (
    <S.Container>
      <Paper elevation={2} square className={classes.paper}>
        <S.CommentContainer>
          <S.AvatarContainer>
            <S.Avatar src="https://picsum.photos/id/272/200/200" />
            <S.Author>
              {props.review.user &&
                props.review.user.firstName + " " + props.review.user.lastName}
              <S.Badge count={props.review.user && props.review.user.nrReviews}>
                {props.review.user && props.review.user.nrReviews}
              </S.Badge>
            </S.Author>
          </S.AvatarContainer>

          <S.CommentContaierBody>
            <S.DetailsContainer>
              <S.Details>
                <StyledRating
                  readOnly
                  name="customized-color"
                  value={props.review.rating}
                  precision={1}
                  icon={<GradeIcon fontSize="inherit" />}
                />
                <DateComponent
                  date={props.review.date}
                  modifiedDate={props.review.modifiedDate}
                />
                <S.Menu>
                  <CustomizedMenus
                    handleDelete={() => props.handleDelete(props.review.id)}
                    owned={props.review.userId === context.userId}
                    toggleEdit={props.toggleEdit}
                  />
                </S.Menu>
              </S.Details>
            </S.DetailsContainer>

            <S.Content>{props.review.text}</S.Content>
          </S.CommentContaierBody>
        </S.CommentContainer>
        <S.GalleryContaier>
          {tags && (
            <S.TagList>
              {tags.map(tagg => (
                <S.Tag key={tagg}>#{tagg.trim()}</S.Tag>
              ))}
            </S.TagList>
          )}

          <S.BasicLine>
            {props.review.images &&
              props.review.images !== [] &&
              (!showPhotos ? (
                <S.ShowPhotos onClick={handlePhotos}>
                  See Photos...
                </S.ShowPhotos>
              ) : (
                photos && (
                  <Gallery
                    images={
                      photos &&
                      photos.map(x => {
                        console.log(x);
                        return {
                          src: x.src,
                          thumbnail: x.src,
                          caption: "This is a placeholder captions"
                        };
                      })
                    }
                    enableImageSelection={false}
                  />
                )
              ))}
          </S.BasicLine>
          <S.Feedback>
            <div
              score={props.review.usersThatScored.length - 1}
              className={classes.Score}
            >
              {props.review.usersThatScored.length - 1}
            </div>
            <div className={classes.Like}>
              <ThumbUpIcon
                onClick={
                  props.review.usersThatScored.filter(x => x === context.userId)
                    .length === 0
                    ? handleThumbUp
                    : () => {}
                }
                color={
                  props.review.usersThatScored.filter(x => x === context.userId)
                    .length > 0
                    ? "primary"
                    : "grey"
                }
              />
            </div>
          </S.Feedback>
        </S.GalleryContaier>
      </Paper>
    </S.Container>
  );
}

export default ReviewReadOnly;
