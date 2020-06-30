import { dishes } from "./Dishes";

export const DishService = {
  getDishes,
  WarmUp,
  Add,
  Delete
};
function Delete(dishId) {
  let currentDishes = getDishesLocalStorage().filter(x => x.id !== dishId);
  localStorage.setItem("dishes", JSON.stringify(currentDishes));
}
function Add(dish) {
  dish.id = GetId();
  let currentDishes = getDishesLocalStorage();
  currentDishes.push(dish);
  localStorage.setItem("dishes", JSON.stringify(currentDishes));
}
function WarmUp() {
  if (!localStorage.getItem("dishes"))
    localStorage.setItem("dishes", JSON.stringify(dishes));
}

function GetId() {
  let dishes = getDishesLocalStorage();
  let id = dishes[dishes.length - 1].id;
  while (id != -1) {
    if (dishes.filter(x => x.id === id)[0]) id++;
    else {
      return id;
    }
  }
}

function getDishes(placeId) {
  let randomizedDishes = getDishesLocalStorage();
  return randomizedDishes.filter(x => x.placeId === placeId);
}

let getDishesLocalStorage = () => {
  return JSON.parse(localStorage.getItem("dishes"));
};
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
