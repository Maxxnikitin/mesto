import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
  }

  _setSubmitForm(evt) {
    evt.preventDefault();
    this.submitForm(this._getInputValues());
  }

  _getInputValues() {
    this._inputList = this.popupSelector.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this.popupSelector.removeEventListener('submit', this.submitForm);
    this.popupSelector.querySelector('form').reset();
    super.close();
  }

  setEventListeners() {
    this._submit = this._setSubmitForm.bind(this);
    this.popupSelector.addEventListener('submit', this._submit, {once: true});
    super.setEventListeners();
  }
}
