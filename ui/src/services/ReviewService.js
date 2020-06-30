import { reviews } from "./Reviews";
import { UserService } from "./UserService";

export const ReviewService = {
  getReviewsForPlace,
  WarmUp,
  Delete,
  Add,
  Update,
  getFiltered,
  getFilteredStars
};

function WarmUp() {
  if (!localStorage.getItem("reviews"))
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function getReviewsForPlace(placeId) {
  let reviews = getReviewsLocalStorage().filter(x => x.place === placeId);
  reviews.map(x => (x.user = UserService.getUser(x.userId)));
  let x = reviews.sort(function(a, b) {
    return ("" + a.id).localeCompare(b.id);
  });
  return x;
}
function Update(review) {
  debugger;
  Delete(review.id);
  AddForUpdate(review);
}

function getFiltered(placeId, searchedArgument) {
  return getReviewsForPlace(placeId).filter(
    x =>
      x.tags.toLowerCase().includes(searchedArgument.toLowerCase()) ||
      x.text.toLowerCase().includes(searchedArgument.toLowerCase())
  );
}

function getFilteredStars(placeId, value) {
  return getReviewsForPlace(placeId).filter(x => x.rating === value);
}

function AddForUpdate(review) {
  let reviews = getReviewsLocalStorage();
  let modifiedReview = {
    ...review
  };
  reviews = [...reviews, modifiedReview];
  localStorage.setItem("reviews", JSON.stringify(reviews));
  return true;
}
function Add(review) {
  let reviews = getReviewsLocalStorage();
  let modifiedReview = {
    ...review,
    date: Date.now(),
    id: GetId(),
    usersThatScored: [review.userId]
  };
  reviews = [...reviews, modifiedReview];
  localStorage.setItem("reviews", JSON.stringify(reviews));
  return true;
}

function GetId() {
  let reviews = getReviewsLocalStorage();
  let id = reviews[reviews.length - 1].id;
  while (id !== -1) {
    if (reviews.filter(x => x.id === id)[0]) id++;
    else {
      return id;
    }
  }
}

function Delete(id) {
  let reviews = getReviewsLocalStorage().filter(x => x.id !== id);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  return true;
}

let getReviewsLocalStorage = () => {
  return JSON.parse(localStorage.getItem("reviews"));
};
