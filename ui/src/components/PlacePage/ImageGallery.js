import React, { useState, useEffect } from "react";
import Gallery from "react-grid-gallery";
import * as S from "./PlaceStyles";
import { ImageService } from "../../services/ImageService";
import { PlaceService } from "../../services/PlaceService";

const imagesPlaceholder = [
  "https://s3-media0.fl.yelpcdn.com/bphoto/F25yrKgW3p5TFLoZ8FYUKw/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/mD6Jws_iBBds2uRxefv1Fg/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/9LihxkSH3zdAqtGCkn2VDQ/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/6vehCn5qoCLGS2Hce-5BUA/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/UCi_RbxYJGN4jyFQuxUroQ/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/hCnQf92Z_4hXopIx6LTNZQ/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/wA7oxCzcMljVgURAVXKsvw/o.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/Jfjh22ZMDgY4tz9OeZBj3w/o.jpg"
];
function ImageGallery(props) {
  const [images, setimages] = useState();
  const [place, setplace] = useState("");
  useEffect(() => {
    let x = props.placeId;

    setplace(PlaceService.getPlace(props.placeId.toString()));
  }, []);

  useEffect(() => {
    let imgs = [];
    if (place !== "") {
      let x = place;

      ImageService.getPreviewImages(place.images).map(x => {
        imgs.push({
          src: x.src,
          thumbnail: x.src,
          thumbnailWidth: (Math.random() + 0.5) * 400,
          thumbnailHeight: 300,
          caption: "This is a placeholder captions"
        });
      });
      setimages(imgs);
    }
  }, [place]);
  return (
    <>
      <S.Title>{place && place.tilte}</S.Title>
      <S.Subtitle>Gallery</S.Subtitle>
      <S.FullGallery>
        {images && <Gallery images={images} enableImageSelection={false} />}
      </S.FullGallery>
    </>
  );
}
export default ImageGallery;
