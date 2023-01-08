export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const popupImage = document.querySelector('.popup_img');
export const popupViewImage = popupImage.querySelector('.popup__image');
export const cardsItemsElement = document.querySelector('.cards__items');
export const closeButtons = document.querySelectorAll('.popup__close-btn');
export const popupEditBtn = document.querySelector('.profile__edit-button');
export const popupFormProfile = document.querySelector('.popup__form-profile');
export const popupProfile = document.querySelector('.popup_profile');
export const profileInputName = document.querySelector('#popup-name_profile');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileInputAbout = document.querySelector('#popup-about_profile');
export const popupPlace = document.querySelector('.popup_place');
export const popupEditPlace = document.querySelector('.profile__add-button');
export const popupCreateImgBtn = document.querySelector('.popup__create-btn');
export const popupFormPlace = document.querySelector('.popup__form-place');

export const addInputPlace = document.querySelector('#popup-name_place');
export const addInputLink = document.querySelector('#popup-about_place');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_invalid',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};
