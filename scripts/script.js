const popup = document.querySelector(".popup");
const popupToggle = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close-btn");
const popupName = document.querySelector(".popup__input-name");
const popupAbout = document.querySelector(".popup__input-about");
const popupSubmit = document.querySelector(".popup__submit-btn");

const profileName = document.querySelector(".profile__name");
const profilePopup = document.querySelector(".profile__about");

function openedPopup() {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupAbout.value = profilePopup.textContent;
}

function closedPopup() {
  popup.classList.remove("popup_opened");
}

let popupForm = document.querySelector(".popup__form");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profilePopup.textContent = popupAbout.value;
  closedPopup();
}

popupForm.addEventListener("submit", formSubmitHandler);
popupClose.addEventListener("click", closedPopup);
popupToggle.addEventListener("click", openedPopup);
