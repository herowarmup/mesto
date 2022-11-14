// Обозначение перменных
const popup = document.querySelector(".popup");
const popupToggle = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close-btn");
const popupName = document.querySelector("#popup-name");
const popupAbout = document.querySelector("#popup-about");

const profileName = document.querySelector(".profile__name");
const profilePopup = document.querySelector(".profile__about");

let popupForm = document.querySelector(".popup__form");

// Открытие
function openedPopup() {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupAbout.value = profilePopup.textContent;
}

// Закрытие
function closedPopup() {
  popup.classList.remove("popup_opened");
}

// Сохранение данных и закрытие
function handlerSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profilePopup.textContent = popupAbout.value;
  closedPopup();
}

// Отслеживание действий
popupForm.addEventListener("submit", handlerSubmitForm);
popupClose.addEventListener("click", closedPopup);
popupToggle.addEventListener("click", openedPopup);
