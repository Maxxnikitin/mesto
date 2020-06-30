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
    const item = {
      name: this.popupSelector.querySelector('.form__input_name').value,
      link: this.popupSelector.querySelector('.form__input_link').value
    };
    return item;
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
