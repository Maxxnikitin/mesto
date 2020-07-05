export class Card {
  constructor(cardSelector, putLike, delLike, {data, handleCardClick},  delCard) {
    this._name = data.name;
    this._picture = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._putLike = putLike;
    this._delLike = delLike;
    this._cardSelector = cardSelector;
    this._delCard = delCard;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.photo')
      .cloneNode(true);
    this._element = cardElement;
    this._element.id = this._id;
    this._element.querySelector('.photo__like-counter').textContent = this._likes.length;
    return this._element;
  }

  _whoIsOwner(_owner) {
    if (this._owner === '6846d4e780db340ba17dae26') {
    } else {
        this._element.querySelector('.button_del').classList.add('button_del-invisible');
    }
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
    this._whoIsOwner(this._owner)
    if (this._likes.find(item => item._id === '6846d4e780db340ba17dae26')) {
      this._element.querySelector('.button_like').classList.add('button_like-active');
    }
    return this._element;
  }

  _cardDel() {
    this._delCard();
    this._element.removeEventListener('click', this._cardHandler);
  }

  //Функция удаления только своих фото
  _cardClickHandler(evt) {
    if (evt.target.classList.contains('button_del')) {  // удаление
        this._cardDel();
    }
  }

  //Функция добавления слушателя кнопке like
  _showLike() {
    //this._element.querySelector('.button_like').classList.toggle('button_like-active');
    if (this._element.querySelector('.button_like').classList.contains('button_like-active')) {
      this._element.querySelector('.button_like').classList.remove('button_like-active');
      this._element.querySelector('.photo__like-counter').textContent = this._likes.length -= 1;
      this._delLike(this._id);
      return;
    }
    this._element.querySelector('.button_like').classList.add('button_like-active');
    this._putLike(this._id);
    this._element.querySelector('.photo__like-counter').textContent = this._likes.length += 1;
  }

  //Функция добавления слушателей
  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener('click', this._cardHandler);

    this._element.querySelector('.button_like').addEventListener('click', () => {
      this._showLike();
    }); //слушатель сердечка
    this._element.querySelector('.photo__image').addEventListener('click', () => {
      this._handleCardClick(); //слушатель увеличенной карточки
    });
  }
}
