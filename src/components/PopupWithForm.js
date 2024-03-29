import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submitBtn = this._popup.querySelector('.popup__submit-btn');
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      return (this._formValues[input.id] = input.value);
    });
    return this._formValues;
  }

  loading(text, isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = text;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitCallback(inputValues);
      // super.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
