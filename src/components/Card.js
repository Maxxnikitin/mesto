export class Card {
  constructor(cardSelector, {data, handleCardClick}) {
    this._name = data.name;
    this._picture = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.photo')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners();
    const photoImg = this._element.querySelector('.photo__image');
    const photoName = this._element.querySelector('.photo__name');
    photoImg.src = this._picture;
    photoImg.alt = this._name;
    photoName.textContent = this._name;
    return this._element;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null
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
      this._handleCardClick(); //слушатель увеличенной карточки
    });
  }
}
