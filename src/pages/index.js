import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  cardsItemsElement,
  popupEditBtn,
  popupFormProfile,
  popupProfile,
  profileInputName,
  profileName,
  profileAbout,
  profileAvatar,
  popupAvatar,
  popupFormAvatar,
  profileInputAbout,
  config,
  popupPlace,
  popupEditPlace,
  popupFormPlace,
  popupImage,
  popupDelete,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

let userId;

import './index.css';

function createCard(data) {
  const card = new Card(
    userId,
    data,
    '.cards__template',
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function handleLikeClick(id, card) {
  const method = card.getLikeState() ? 'DELETE' : 'PUT';
  api
    .setLike(id, method)
    .then((res) => {
      card.setLikeCounter(res.likes.length);
      card.likeChange();
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleDeleteCardSubmit(id, removeCard) {
  deletePopup.loading('Удаление...', true);
  api
    .deleteCard(id)
    .then(() => {
      removeCard();
      deletePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      deletePopup.loading(false);
    });
}

function handleDeleteCard(id, removeCard) {
  deletePopup.open(id, removeCard);
}

const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.prependItem(createCard(item));
    },
  },
  cardsItemsElement
);

function fillInFormInputs() {
  const { profileAbout, profileName } = profileInfo.getUserInfo();
  profileInputName.value = profileName;
  profileInputAbout.value = profileAbout;
}

const profileInfo = new UserInfo({
  profileName,
  profileAbout,
  profileAvatar,
});

function submitEditProfileForm(obj) {
  editPopup.loading('Сохранение...', true);
  api
    .setUserInfo(obj)
    .then((res) => {
      profileInfo.setUserInfo(res);
      editPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      editPopup.loading(false);
    });
}

function submitAddCardForm(obj) {
  addPopup.loading('Сохранение...', true);
  api
    .createCard(obj)
    .then((res) => {
      cardsItemsElement.prepend(createCard(res));
      addPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      addPopup.loading(false);
    });
}

function submitAvatarSaveForm(obj) {
  avatarPopup.loading('Сохранение...', true);
  api
    .updateAvatar(obj)
    .then(() => {
      profileInfo.setAvatar(obj);
      avatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      avatarPopup.loading(false);
    });
}

profileAvatar.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

popupEditBtn.addEventListener('click', () => {
  fillInFormInputs();
  editFormValidator.resetValidation();
  editPopup.open();
});

popupEditPlace.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addPopup.open();
});

const editFormValidator = new FormValidator(config, popupFormProfile);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, popupFormPlace);
addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(config, popupFormAvatar);
avatarFormValidator.enableValidation();
const imgPopup = new PopupWithImage(popupImage);
imgPopup.setEventListeners();
const editPopup = new PopupWithForm(popupProfile, submitEditProfileForm);
editPopup.setEventListeners();
const addPopup = new PopupWithForm(popupPlace, submitAddCardForm);
addPopup.setEventListeners();
const avatarPopup = new PopupWithForm(popupAvatar, submitAvatarSaveForm);
avatarPopup.setEventListeners();
const deletePopup = new PopupWithConfirmation(popupDelete, handleDeleteCardSubmit);
deletePopup.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'dc777274-27d8-46a3-b170-8163671c28dd',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileInfo.setUserInfo(userData);
    cardSection.renderItems(cards.reverse());
  })
  .catch((e) => console.error(e));
