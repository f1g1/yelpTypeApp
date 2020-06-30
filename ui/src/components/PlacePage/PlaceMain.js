import React, { useEffect, useState } from "react";
import * as S from "./PlaceStyles";
import GeneralInfoCard from "./Cards/GeneralInfoCard";
import { Paper, Fab } from "@material-ui/core";
import Hours from "./Cards/Hours";
import DishCard from "../Resuables/DishCard/DishCard";
import { navigate } from "@reach/router";
import { PlaceService } from "../../services/PlaceService";
import { ImageService } from "../../services/ImageService";
import { DishService } from "../../services/DishService";
import AddIcon from "@material-ui/icons/Add";
import { UserService } from "../../services/UserService";
import AddDish from "./Modals/AddDish/AddDish";
function PlaceMain(props) {
  const [place, setplace] = useState();
  const [galleryPreview, setgalleryPreview] = useState();
  const [dishes, setdishes] = useState();
  const [openDishes, setOpenDishes] = useState(false);
  useEffect(() => {
    console.log("INEFFECT");
    setplace(PlaceService.getPlace(props.placeId));
    setdishes(DishService.getDishes(props.placeId));

    console.log("PLACE", place);
  }, []);
  useEffect(() => {
    place && setgalleryPreview(ImageService.getPreviewImages(place.images));
  }, [place]);

  let handleRefreshDishes = () => {
    setdishes(DishService.getDishes(props.placeId));
    handleCloseAddDish();
  };
  let goToGallery = () => {
    navigate("/gallery/" + props.placeId);
  };
  let handleCloseAddDish = () => {
    setOpenDishes(false);
  };
  let handleDeleteDish = dishId => {
    DishService.Delete(dishId);
    setdishes(DishService.getDishes(props.placeId));
  };
  const handleRefreshImages = () => {
    place && setgalleryPreview(ImageService.getPreviewImages(place.images));
  };
  return (
    <>
      {place && (
        <>
          <S.Container>
            <Paper square elevation={4}>
              {galleryPreview && (
                <S.Gallery onClick={goToGallery}>
                  {galleryPreview.map(x => (
                    <img
                      key={x.src + "placeMain"}
                      src={x.src}
                      width="auto"
                      height="300px"
                    ></img>
                  ))}
                </S.Gallery>
              )}
            </Paper>
            <S.Cards>
              <S.Column1>
                {place && (
                  <GeneralInfoCard
                    key="d"
                    place={place}
                    handleRefreshImages={handleRefreshImages}
                  ></GeneralInfoCard>
                )}
                <Hours></Hours>
              </S.Column1>

              <S.Column2>
                {dishes &&
                  [...dishes].map((dish, index) => (
                    <DishCard
                      key={index}
                      dish={dish}
                      canDelete={
                        place &&
                        UserService.getCurrentUser() &&
                        place.managerId === UserService.getCurrentUser().id
                      }
                      deleteDish={handleDeleteDish}
                    />
                  ))}
                {place &&
                  UserService.getCurrentUser() &&
                  place.managerId === UserService.getCurrentUser().id && (
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={() => setOpenDishes(true)}
                    >
                      <AddIcon />
                    </Fab>
                  )}
              </S.Column2>
            </S.Cards>
          </S.Container>
          <AddDish
            open={openDishes}
            handleClose={handleCloseAddDish}
            placeId={place.id}
            refreshDishes={handleRefreshDishes}
            deleteDish={handleDeleteDish}
          />
        </>
      )}
    </>
  );
}

export default PlaceMain;
