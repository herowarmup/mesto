// Импорт массива
import initialCards from "./arrs.js";

// Обозначение классов профиля
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

// Обхявление и клонирование карточек
const cardsItemsElement = document.querySelector(".cards__items");
const cardsTemplate = document.querySelector(".cards__template").content.querySelector(".card").cloneNode(true);

// Объявление попапа карточек
const popupImage = document.querySelector(".popup_img");
const popupCloseImage = document.querySelector(".popup__close-image");

// Обозначение попапа
const popupProfile = document.querySelector(".popup_profile");
const popupToggleProfile = document.querySelector(".profile__edit-button");
const popupCloseProfile = document.querySelector(".popup__close-profile");
const profileInputName = document.querySelector("#popup-name_profile");
const profileInputAbout = document.querySelector("#popup-about_profile");
const popupFormProfile = document.querySelector(".popup__form-profile");

// Обозначение добавления карточки
const popupPlace = document.querySelector(".popup_place");
const popupTogglePlace = document.querySelector(".profile__add-button");
const popupClosePlace = document.querySelector(".popup__close-place");
const addInputPlace = document.querySelector("#popup-name_place");
const addInputLink = document.querySelector("#popup-about_place");
const popupFormPlace = document.querySelector(".popup__form-place");

// Открытие попапов
function openedPopup(popupItem) {
  popupItem.classList.add("popup_opened");
}

// Закрытие попапов
function closedPopup(popupItem) {
  popupItem.classList.remove("popup_opened");
}

// Запись данных в инпуты
function createInfo() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

// Сохранение данных и закрытие
function handlerSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closedPopup(popupProfile);
}

// Функция создания карточки, отслежование лайка и удаления
function createCard(placeVal, linkVal) {
  const card = cardsTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  cardImage.src = linkVal;
  cardImage.alt = placeVal;
  cardTitle.textContent = placeVal;

  const cardDeleteButton = card.querySelector(".card__delete");
  const cardLikeButton = card.querySelector(".card__like");

  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
  cardLikeButton.addEventListener("click", handleLikeButtonClick);

  const popupViewImage = popupImage.querySelector(".popup__image");
  console.log(popupViewImage);

  cardImage.addEventListener("click", function () {
    popupViewImage.src = linkVal;
    popupViewImage.alt = placeVal;
    popupImage.querySelector(".popup__text").textContent = placeVal;
    openedPopup(popupImage);
  });

  return card;
}
// Обработка лайков и удаления
const handleDeleteButtonClick = (evt) => {
  evt.target.closest(".card").remove();
};

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like_active");
};

// Добавление карточек
function renderCard(textPlace, linkPlace) {
  cardsItemsElement.prepend(createCard(textPlace, linkPlace));
}

// Цикл загрузки карточек
initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});

// Обработчики событый
popupToggleProfile.addEventListener("click", function () {
  openedPopup(popupProfile);
  createInfo();
});
popupCloseProfile.addEventListener("click", function () {
  closedPopup(popupProfile);
});
popupFormProfile.addEventListener("submit", handlerSubmitForm);

popupTogglePlace.addEventListener("click", function () {
  openedPopup(popupPlace);
});
popupClosePlace.addEventListener("click", function () {
  closedPopup(popupPlace);
});
popupCloseImage.addEventListener("click", function () {
  closedPopup(popupImage);
});

// Обработка сабмита добавления карточки
popupFormPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  prependCard(addInputPlace.value, addInputLink.value);
  addInputPlace.value = "";
  addInputLink.value = "";
  closedPopup(popupPlace);
});
