import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupProfile = document.querySelector('#popup-profile');
const popupNewImages = document.querySelector('#popup-new-images');
export const popupBigImage = document.querySelector('#popup-big-image');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');
const titleInput = document.querySelector('#place-title');
const linkInput = document.querySelector('#image-link');
const buttonCloseProfile = document.querySelector('#close-profile');
const buttonCloseNewImages = document.querySelector('#close-new-images');
const buttonCloseBig = document.querySelector('.button_close-big');
const formElement = document.querySelector('#form-edit');
const formImageElement = document.querySelector('#form-image');
const bigImage = document.querySelector('.big-image');
const bigImageTitle = document.querySelector('.big-image__title');
const overlayProfile = popupProfile.querySelector('.popup__overlay');
const overlayNewImages = popupNewImages.querySelector('.popup__overlay');
const overlayBigImage = popupBigImage.querySelector('.popup__overlay');
const popups = Array.from(document.querySelectorAll('.popup'));
const forms = Array.from(document.querySelectorAll('.form'));
const errorName = document.querySelector('#fullname-error');
const errorAbout = document.querySelector('#about-error');
const errorPlaceTitle = document.querySelector('#place-title-error');
const errorImageLink = document.querySelector('#image-link-error');
const photoCard = document.querySelector('.photos');
const formObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'form__submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

//Массив изначальных фотографий
const initialCards = [
  {
      name: 'Алтай',
      link: './images/photos/altai.jpg',
  },
  {
      name: 'Байкал',
      link: './images/photos/baikal.jpg',
  },
  {
      name: 'Домбай',
      link: './images/photos/dombai.jpg',
  },
  {
      name: 'Эльбрус',
      link: './images/photos/elbrus.jpg',
  },
  {
      name: 'Архыз',
      link: './images/photos/arkhyz.jpg',
  },
  {
    name: 'Хакасия',
    link: './images/photos/khakassia.jpg',
  }
];

//Функция закрытия попапов кнопкой Esc
function escClose (evt) {
  if (evt.key === 'Escape') {
    popups.find((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
}

//Отвечает за открытие попапов
export function openPopup (elem) {
  elem.classList.add('popup_opened');
  //Добавляем слушателя кнопки Esc
  document.addEventListener('keydown', escClose);
}

//Отвечает за закрытие попапов
function closePopup (elem) {
  elem.classList.remove('popup_opened');
  //Удаляем слушателя кнопки Esc
  document.removeEventListener('keydown', () => escClose(elem));
}

//Функция для добавления карточек из массива
initialCards.forEach((item) => {
  const card = new Card(item, '.photo');
  // Добавляем в DOM
  photoCard.prepend(card.generateCard());
});

//Функия для сохранения новой фотографии
function submitImage(evt) {
  evt.preventDefault();
  const object = {};
  object.link = linkInput.value;
  object.name = titleInput.value;

  const card = new Card(object, '.photo');
  // Добавляем в DOM
  photoCard.prepend(card.generateCard());
  closePopup(popupNewImages);
}

//Функция удаления текста ошибок при открытии формы
function removeError(elem) {
  elem.querySelectorAll('.form__input-error').forEach((span) => {
    span.classList.remove(formObject.errorClass);
    span.textContent = '';
  });
  elem.querySelectorAll(formObject.inputSelector).forEach((input) => {
    input.classList.remove(formObject.inputErrorClass);
  });
}

//Функция блокировки кнопки при открытии попапа
function disabledButton (elem) {
  elem.querySelector('.button_submit').classList.add('form__submit-inactive');
  elem.querySelector('.button_submit').disabled = true;
}

//Отвечает за открытие попапа с редактированием профиля
function openPopupProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  if (errorName.classList.contains(formObject.errorClass) ||
    errorAbout.classList.contains(formObject.errorClass)) {
    removeError(popupProfile);
  }
  openPopup(popupProfile);
  disabledButton(popupProfile);
}

//Отвечает за открытие попапа с добавлением фото
function openPopupNewImages () {
  titleInput.value = '';
  linkInput.value = '';
  if (errorPlaceTitle.classList.contains(formObject.errorClass) ||
    errorImageLink.classList.contains(formObject.errorClass)) {
    removeError(popupNewImages);
  }
  openPopup(popupNewImages);
  disabledButton(popupNewImages);
}

//Функция для сохранения редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

//Валидация форм
const validProfile = new FormValidator(formObject, formElement);
validProfile.enableValidation();

const validNewImage = new FormValidator(formObject, formImageElement);
validNewImage.enableValidation();

formElement.addEventListener('submit', formSubmitHandler);
formImageElement.addEventListener('submit', submitImage);
buttonEdit.addEventListener('click', openPopupProfile);
buttonAdd.addEventListener('click', openPopupNewImages);
buttonCloseProfile.addEventListener('click', () => closePopup(popupProfile));
overlayProfile.addEventListener('click', () => closePopup(popupProfile));
buttonCloseNewImages.addEventListener('click', () => closePopup(popupNewImages));
overlayNewImages.addEventListener('click', () => closePopup(popupNewImages));
buttonCloseBig.addEventListener('click', () => closePopup(popupBigImage));
overlayBigImage.addEventListener('click', () => closePopup(popupBigImage));
