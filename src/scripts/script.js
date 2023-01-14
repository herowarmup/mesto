import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  initialCards,
  cardsItemsElement,
  closeButtons,
  popupEditBtn,
  popupFormProfile,
  popupProfile,
  profileInputName,
  profileName,
  profileAbout,
  profileInputAbout,
  config,
  popupPlace,
  popupEditPlace,
  popupFormPlace,
  addInputPlace,
  addInputLink,
  popupImage,
  popupImageText,
  popupViewImage,
} from './constants.js';
import { Section } from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.Js';
import PopupWithForm from './PopupWithForm.js';

import '../pages/index.css';

const createCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cards = createCard(item);
      createCards.addItem(cards);
    },
  },
  cardsItemsElement
);
createCards.renderItems();

function createCard(item) {
  const card = new Card(item, '.cards__template', handleCardClick);
  const cardsTemplate = card.generateCard();

  return cardsTemplate;
}

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function fillInFormInputs() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

function submitEditProfileForm(obj) {
  profileInfo.setUserInfo(obj);
}

function submitAddCardForm() {
  const newCardElement = {
    link: addInputLink.value,
    name: addInputPlace.value,
  };
  cardsItemsElement.prepend(createCard(newCardElement));
  addPopup.close();
}

popupEditBtn.addEventListener('click', () => {
  fillInFormInputs();
  editFormValidator.resetValidation();
  editPopup.open();
});

popupEditPlace.addEventListener('click', function () {
  addFormValidator.resetValidation();
  popupFormPlace.reset();
  addPopup.open();
});

const editFormValidator = new FormValidator(config, popupFormProfile);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, popupFormPlace);
addFormValidator.enableValidation();
const imgPopup = new PopupWithImage(popupImage);
imgPopup.setEventListeners();
const editPopup = new PopupWithForm(popupProfile, submitEditProfileForm);
editPopup.setEventListeners();
const addPopup = new PopupWithForm(popupPlace, submitAddCardForm);
addPopup.setEventListeners();

const profileInfo = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout,
});
