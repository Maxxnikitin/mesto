export class Popup {
  constructor(popupSelector) {
      this.popupSelector = popupSelector;
  }

  close() {
    this.popupSelector.classList.remove('popup_opened');
  }

  open() {
      this.setEventListeners();
      this.popupSelector.classList.add('popup_opened');
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
          this.close()
      }
  }

  setEventListeners() {
      this.closeButton = this.popupSelector.querySelector('#button_close-item');
      this.overlay = this.popupSelector.querySelector('.popup__overlay');
      //Закрытие попапа крестиком
      this.closeButton.addEventListener('click', () => this.close());
      //закрытие попапа кнопкой Esc
      document.addEventListener('keydown', evt => this._handleEscClose(evt));
      //Закрытие попапа по оверлею
      this.overlay.addEventListener('click', () => this.close());
  }
}
