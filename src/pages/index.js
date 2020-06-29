import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';
import {removeError} from '../components/utils/utils.js';
import {disabledButton} from '../components/utils/utils.js';

const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupProfile = document.querySelector('#popup-profile');
const popupNewImages = document.querySelector('#popup-new-images');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');
const formElement = document.querySelector('#form-edit');
const formImageElement = document.querySelector('#form-image');
export const popupBigImage = document.querySelector('#popup-big-image');
const photoCard = document.querySelector('.photos');
const template = document.querySelector('.photo');
export const formObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'form__submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

//Массив изначальных фотографий
const items = [
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

//Попап с увеличенными фото
const popupBigPicture = new PopupWithImage(popupBigImage);

//Форма с добавлением фото
const openFormImage = new PopupWithForm(popupNewImages, {
  submitForm: (item) => {
      const card = new Card(template, {
          data: item, handleCardClick: () => {
              popupBigPicture.open(item);
          }
      });
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
      openFormImage.close();
  }
},);

const openPicForm = function () {
  removeError(popupNewImages);
  disabledButton(popupNewImages);
  openFormImage.open();
}

export const formProfileInfo = {
  profileAuthor: document.querySelector('.profile__name'),
  profileStatus: document.querySelector('.profile__about'),
};

//Форма с редактированием профиля
const userInfo = new UserInfo(formProfileInfo);
const openFormInfo = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
      userInfo.setUserInfo(item);
      openFormInfo.close();
  }
});

const openInfoForm = () => {
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.info;
  removeError(popupProfile);
  disabledButton(popupProfile);
  openFormInfo.open();
}

const CardList = new Section({
  items, renderer: (item) => {
      const card = new Card(template, {
          data: item, handleCardClick: () => {
              popupBigPicture.open(item);
          }
      });
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
  }
}, photoCard);

CardList.renderItems(items);


//Валидация форм
const validProfile = new FormValidator(formObject, formElement);
validProfile.enableValidation();

const validNewImage = new FormValidator(formObject, formImageElement);
validNewImage.enableValidation();

buttonAdd.addEventListener("click", () => openPicForm());
buttonEdit.addEventListener("click", () => openInfoForm());
