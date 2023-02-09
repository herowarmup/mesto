import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._submitCallback = submitCallback;
    this._submitBtn = this._popup.querySelector('.popup__delete-btn');
    this._submitBtnText = this._submitBtn.textContent;
  }

  setEventListeners() {
    this._submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this._submitCallback(this._id, this._removeCard);
      super.close();
    });

    super.setEventListeners();
  }

  open(id, removeCard) {
    this._id = id;
    this._removeCard = removeCard;
    super.open();
  }
}
