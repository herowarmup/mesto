import { openPopup } from './script.js';
import { popupImage, popupViewImage } from './constants.js';

export class Card {
  constructor(data, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(this._templateElement).content.querySelector('.card').cloneNode(true);

    return cardsTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    popupViewImage.src = this._link;
    popupViewImage.alt = this._name;
    popupImage.querySelector('.popup__text').textContent = this._name;

    openPopup(popupImage);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }
}
