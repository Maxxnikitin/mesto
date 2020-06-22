import {openPopup, popupBigImage} from './index.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._picture = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('#photo')
            .content
            .querySelector('.photo')
            .cloneNode(true);
        this._element = cardElement;
        return this._element;
    }

    _showPictureBig() {
        //добавляем поп-ап увеличения картинки, на которую мы нажали
        document.querySelector('.big-image').src = this._picture;
        document.querySelector('.big-image').alt = this._name;
        document.querySelector('.big-image__title').textContent = this._name;
        openPopup(popupBigImage);
    }

    generateCard() {
        // Запишем разметку в приватное поле _element.
        this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.photo__image').src = this._picture;
        this._element.querySelector('.photo__image').alt = this._name;
        this._element.querySelector('.photo__name').textContent = this._name;
        return this._element;
    }

    _deleteCard() {
        this._element.remove()
    };

    //Функция добавления слушателя кнопке like
    _showLike() {
        this._element.querySelector('.button_like').classList.toggle('button_like-active');
    }

    //Функция добавления слушателей
    _setEventListeners() {
      this._element.querySelector('.button_like').addEventListener('click', () => {
          this._showLike();
      }); //слушатель сердечка
      this._element.querySelector('.button_del').addEventListener('click', () => {
          this._deleteCard(); //слушатель мусорного ведра
      });
      this._element.querySelector('.photo__image').addEventListener('click', () => {
          this._showPictureBig(); //слушатель увеличенной карточки
      });

  }
}
