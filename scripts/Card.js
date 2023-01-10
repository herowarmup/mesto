export class Card {
  constructor(data, templateElement, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(this._templateElement).content.querySelector('.card').cloneNode(true);

    return cardsTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like');

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }
}
