// Импорт массива
import initialCards from "./constants.js";

// Обозначение классов профиля
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

// Обхявление и клонирование карточек
const cardsItemsElement = document.querySelector(".cards__items");
const cardsTemplate = document.querySelector(".cards__template").content.querySelector(".card").cloneNode(true);

// Объявление попапа карточек
const popupImage = document.querySelector(".popup_img");

// Обозначение попапа
const popupProfile = document.querySelector(".popup_profile");
const popupToggleProfile = document.querySelector(".profile__edit-button");
const profileInputName = document.querySelector("#popup-name_profile");
const profileInputAbout = document.querySelector("#popup-about_profile");
const popupFormProfile = document.querySelector(".popup__form-profile");

// Обозначение добавления карточки
const popupPlace = document.querySelector(".popup_place");
const popupTogglePlace = document.querySelector(".profile__add-button");
const addInputPlace = document.querySelector("#popup-name_place");
const addInputLink = document.querySelector("#popup-about_place");
const popupFormPlace = document.querySelector(".popup__form-place");
const popupCreateImgBtn = document.querySelector(".popup__create-btn");

const closeButtons = document.querySelectorAll(".popup__close-btn");
const popupViewImage = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__text");

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Открытие попапов
function openPopup(popupItem) {
  popupItem.classList.add("popup_opened");
  popupItem.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEsc);
}

//  Закрытие попапов
function closePopup(popupItem) {
  popupItem.classList.remove("popup_opened");
  popupItem.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEsc);
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// Запись данных в инпуты
function fillInFormInputs() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

// Сохранение данных и закрытие
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closePopup(popupProfile);
}

// Функция создания карточки, отслежование лайка и удаления
function createCard(place, link) {
  const card = cardsTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = place;
  cardTitle.textContent = place;

  const cardDeleteButton = card.querySelector(".card__delete");
  const cardLikeButton = card.querySelector(".card__like");

  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
  cardLikeButton.addEventListener("click", handleLikeButtonClick);

  cardImage.addEventListener("click", function () {
    popupViewImage.src = link;
    popupViewImage.alt = place;
    popupImageText.textContent = place;
    openPopup(popupImage);
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
  openPopup(popupProfile);
  fillInFormInputs();
});
popupFormProfile.addEventListener("submit", submitEditProfileForm);

popupTogglePlace.addEventListener("click", function () {
  popupCreateImgBtn.setAttribute("disabled", true);
  popupCreateImgBtn.classList.add("popup__submit-btn_invalid");
  openPopup(popupPlace);
});

// Обработка сабмита добавления карточки
popupFormPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderCard(addInputPlace.value, addInputLink.value);
  popupFormPlace.reset();
  closePopup(popupPlace);
});
