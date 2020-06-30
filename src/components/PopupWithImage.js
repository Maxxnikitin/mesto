import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    const popupImage = document.querySelector('.big-image');
    const popupName = document.querySelector('.big-image__title');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupName.textContent = data.name;
    super.open();
  }
}
