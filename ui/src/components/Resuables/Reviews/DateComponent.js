import React from "react";
import * as S from "./ReviewStyle";

export default function DateComponent(props) {
  return (
    <S.Date>
      {" created: "}
      {/* TODO MAKE DATE WORKS WITHOUT WORK AROUND */}
      {new Date(props.date).getDate() +
        "/" +
        (new Date(props.date).getMonth() + 1) +
        "/" +
        new Date(props.date).getFullYear()}
      {props.modifiedDate &&
        " last edited: " +
          new Date(props.modifiedDate).getDate() +
          "/" +
          (new Date(props.modifiedDate).getMonth() + 1) +
          "/" +
          new Date(props.modifiedDate).getFullYear()}
    </S.Date>
  );
}
