import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  cardsItemsElement,
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
  popupImage,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

import './index.css';

function createCard(item) {
  const card = new Card(item, '.cards__template', handleCardClick);
  return card.generateCard();
}

const createCards = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardsItemsElement
);
createCards.renderItems();

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

function submitAddCardForm(inputValues) {
  const newCardElement = {
    link: inputValues['popup-about_place'],
    name: inputValues['popup-name_place'],
  };
  createCards.prependItem(newCardElement);
  addPopup.close();
}

popupEditBtn.addEventListener('click', () => {
  fillInFormInputs();
  editFormValidator.resetValidation();
  editPopup.open();
});

popupEditPlace.addEventListener('click', function () {
  addFormValidator.resetValidation();
  addPopup.open();
});

// С валидацией которую вы посоветовали еще не разобрался
// Буду пробовать, спасибо большое за совет! :))

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
