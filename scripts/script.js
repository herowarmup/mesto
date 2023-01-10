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

function createCard(item) {
  const card = new Card(item, '.cards__template', handleCardClick);
  const cardsTemplate = card.generateCard();

  return cardsTemplate;
}

initialCards.forEach((item) => {
  cardsItemsElement.append(createCard(item));
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
  document.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function handleCardClick(name, link) {
  popupViewImage.src = link;
  popupViewImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
}

function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
  popupItem.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const editFormValidator = new FormValidator(config, popupFormProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, popupFormPlace);
addFormValidator.enableValidation();

function fillInFormInputs() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closePopup(popupProfile);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const newCardElement = {
    link: addInputLink.value,
    name: addInputPlace.value,
  };
  cardsItemsElement.prepend(createCard(newCardElement));

  closePopup(popupPlace);
}

popupEditBtn.addEventListener('click', function () {
  fillInFormInputs();

  editFormValidator.resetValidation();
  openPopup(popupProfile);
});

popupEditPlace.addEventListener('click', function () {
  popupFormPlace.reset();

  addFormValidator.resetValidation();
  openPopup(popupPlace);
});

popupFormProfile.addEventListener('submit', submitEditProfileForm);
popupFormPlace.addEventListener('submit', submitAddCardForm);
