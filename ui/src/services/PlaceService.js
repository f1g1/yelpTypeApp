import { Places } from "./Places";

export const PlaceService = {
  getPlaces,
  getPlace,
  WarmUp,
  getFiltered,
  Update
};

function Update(place) {
  Delete(place.id);
  AddForUpdate(place);
}
function AddForUpdate(place) {
  let places = getPlacesLocalStorage();
  places = [...places, place];
  localStorage.setItem("places", JSON.stringify(places));
  return true;
}

function Delete(id) {
  let places = getPlacesLocalStorage().filter(x => x.id !== id);
  localStorage.setItem("places", JSON.stringify(places));
  return true;
}
function WarmUp() {
  if (!localStorage.getItem("places"))
    localStorage.setItem("places", JSON.stringify(Places));
}

function getPlaces() {
  return getPlacesLocalStorage().sort(function(a, b) {
    return ("" + a.id).localeCompare(b.id);
  });
}

function getFiltered(text) {
  return getPlacesLocalStorage().filter(
    x =>
      x.title.toLowerCase().includes(text.toLowerCase()) ||
      x.category.toLowerCase().includes(text.toLowerCase())
  );
}

function getPlace(id) {
  return getPlacesLocalStorage().filter(x => x.id === id)[0];
}

let getPlacesLocalStorage = () => {
  return JSON.parse(localStorage.getItem("places"));
};
