import React from "react";
import * as S from "./SearchPageStyle";
import { navigate } from "@reach/router";
import { ImageService } from "../../services/ImageService";
import { handleOpenNow } from "../Resuables/GeneralMethods";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Tooltip from "@material-ui/core/Tooltip";

export default function SimpleList(props) {
  let handleSelect = index => {
    props.select(index);
  };
  let handleDeselect = index => {
    props.deselect(index);
  };
  let handleClick = x => {
    navigate("/place/" + x.id);
  };
  return (
    <S.List>
      {props.locations &&
        props.locations.map((x, index) => (
          <S.ListItem
            onClick={() => handleClick(x)}
            key={"li" + x.id}
            onMouseEnter={() => handleSelect(index)}
            onMouseLeave={() => handleDeselect(index)}
            selected={x.selected}
          >
            <S.Img src={ImageService.getSpecificImages([x.images[0]])}></S.Img>
            <S.Title>
              {x.title}
              <br />
              {x.category}
              {handleOpenNow(x.hours) ? (
                <S.OpenStatus props={props}>Open now!</S.OpenStatus>
              ) : (
                <S.OpenStatus closed props={props}>
                  Closed now!
                </S.OpenStatus>
              )}
            </S.Title>
            <S.AdditionalInfoContainer>
              <S.Rating>
                {"rating: " + (x.rating / x.ratings).toFixed(2)}
              </S.Rating>
              with {x.ratings} ratings
              {x.managerId && (
                <Tooltip title="This is a managed page">
                  <VerifiedUserIcon color={!x.selected ? "primary" : "white"} />
                </Tooltip>
              )}
            </S.AdditionalInfoContainer>
          </S.ListItem>
        ))}
    </S.List>
  );
}
