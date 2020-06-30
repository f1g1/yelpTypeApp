import { images } from "./Images";

export const ImageService = {
  getPreviewImages,
  WarmUp,
  getImages,
  getSpecificImages,
  getImagesReviewObject,
  AddBlop
};

function GetId() {
  let images = getImagesLocalStorage();
  let id = images[images.length - 1].id;
  while (id != -1) {
    if (images.filter(x => x.id === id)[0]) id++;
    else {
      return id.toString();
    }
  }
}

function AddBlop(image) {
  let newImage = { src: image };
  newImage.id = GetId();
  let currentImages = getImagesLocalStorage();
  currentImages.push(newImage);
  localStorage.setItem("images", JSON.stringify(currentImages));
  return newImage.id;
}

function WarmUp() {
  if (!localStorage.getItem("images"))
    localStorage.setItem("images", JSON.stringify(images));
}

function getPreviewImages(ids) {
  let randomizedImages = getImagesLocalStorage();
  let result = randomizedImages.filter(x => ids.includes(x.id));

  return result;
}
function getImagesLocalStorage() {
  return JSON.parse(localStorage.getItem("images"));
}

function getImages(placeId) {
  return getImagesLocalStorage().map(x => x.src);
}
function getSpecificImages(imagesIds) {
  let x = [];
  let imgs = getImagesLocalStorage();
  imagesIds &&
    imagesIds.forEach(element => {
      x.push(imgs.filter(img => img.id === element)[0].src);
    });
  return x;
}

function getImagesReviewObject(imagesIds) {
  let x = [];
  let imgs = getImagesLocalStorage();
  imagesIds &&
    imagesIds.forEach(element => {
      x.push(imgs.filter(img => img.id === element)[0]);
    });
  return x;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
