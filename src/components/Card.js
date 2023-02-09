export class Card {
  constructor(userId, data, templateElement, handleCardClick, handleDeleteCard, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._deleteCard = this._deleteCard.bind(this);
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardsTemplate = document
      .querySelector(this._templateElement)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardsTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._deleteButton = this._element.querySelector('.card__delete');
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._likeState = this._likes.some((like) => like._id === this._userId);

    this._likeCounter.textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this.getLikeState()) {
      this.likeChange();
    }

    this._deleteVisible();
    this._setEventListeners();

    return this._element;
  }

  _deleteVisible() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.card__delete').remove();
    }
  }

  getLikeState() {
    return this._likeState;
  }

  _setEventListeners() {
    const card = this;

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id, card);
      this._likeState = !this._likeState;
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._id, this._deleteCard);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  likeChange() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  setLikeCounter(likes) {
    this._likeCounter.textContent = likes;
  }
}
