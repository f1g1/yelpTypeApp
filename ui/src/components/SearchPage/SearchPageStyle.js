import styled from "styled-components";

export const OpenStatus = styled.div`
  cursor: default;
  padding: 5px 10px;
  width: 100px;
  height: 30px;
  font-size: 18px;
  margin: 50px 5px 10px 0px;
  color: white;
  box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
  width: fit-content;
  background: ${props => (props.closed ? "darkred" : "darkcyan")};
`;
export const Container = styled.div`
  display: flex;
`;
export const VContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 70;
  align-items: center;
  justify-content: center;
`;
export const ListItem = styled.li`
  list-style-type: none;
  cursor: pointer;
  width: 80%;
  margin-bottom: 20px;
  padding-bottom: 5px;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  margin-right: 5px;
  padding: 7px;
  display: flex;
  background: ${props => (props.selected ? "darkcyan" : "rgba(0,0,0,0.1)")};
  color: ${props => props.selected && "white"};
`;
export const Marker = styled.div`
  position: relative;
  cursor: pointer;
  top: 100%;
  left: 50%;
  transform: translate(-80%, -80%);
  z-index: ${props => (props.selected === true ? 999 : 9)};
`;
export const Map = styled.div`
  margin-right: 16px;
  height: "80vh";
  max-height: 500px;
  width: "100%";
  min-width: 300px;
  margin-top: 16px;
  display: block;
  flex-grow: 30;
  position: sticky !important;
  top: 80px;
  justify-content: space-between;
  min-height: 300px;
`;
export const Rating = styled.div`
  align-self: left;
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  flex-grow: 90;
  margin-left: 5%;
`;
export const AdditionalInfoContainer = styled.div`
  flex-grow: 10;
  font-size: 16px;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`;
export const label = styled.div`
  background: snow;
  font-size: 20px;
  position: absolute;
  z-index: 10;
`;
export const Img = styled.img`
  margin: 10px 20px 10px 20px;
  max-height: 200px;
  width: 250px;
  height: auto;
`;
