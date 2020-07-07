//Импорт css файла
import './index.css';

import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Popup} from "../components/Popup.js";
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from "../components/Api.js";
import {loading} from "../components/utils/utils.js";

const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const buttonSubmitInfo = document.querySelector('#btn-info');
const buttonSubmitImg = document.querySelector('#btn-img');
const buttonSubmitAvatar = document.querySelector('#btn-avatar');
const popupProfile = document.querySelector('#popup-profile');
const popupNewImages = document.querySelector('#popup-new-images');
const popupDel = document.querySelector('#popup-del');
const popupAvatar = document.querySelector('#popup-new-avatar');
const editAvatar = document.querySelector('.profile__ava-change');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');
const formElement = document.querySelector('#form-edit');
const formImageElement = document.querySelector('#form-image');
export const popupBigImage = document.querySelector('#popup-big-image');
const photoCard = document.querySelector('.photos');
const template = document.querySelector('#photo');
const inputList = Array.from(document.querySelectorAll('.form__input'));
export const formObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'form__submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

export const token = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '83dedcdd-7e88-4905-85f7-b138aebc1b0b',
    'Content-Type': 'application/json'
  },
};

export const api = new Api(token);

//Попап с увеличенными фото
const popupBigPicture = new PopupWithImage(popupBigImage);

//Форма с добавлением фото
const openFormImage = new PopupWithForm(popupNewImages, {
  submitForm: (item) => {
    api.addNewCard(item.name, item.link)
      .then((res) => {
        const card = new Card(template, () => api.putLike(res._id), () => api.deleteLike(res._id), {
          data: res, handleCardClick: () => {
            popupBigPicture.open(res);
          }
        }, () => delPicPopup.submit(res._id), {userId});
        const cardElement = card.generateCard();
        CardList.addItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
    })
    openFormImage.close();
  }
});

const openPicForm = function () {
  validNewImage.removeError(formImageElement);
  validNewImage.toggleButtonState(inputList, buttonSubmitImg);
  openFormImage.open();
}

export const formProfileInfo = {
  profileAuthor: document.querySelector('.profile__name'),
  profileStatus: document.querySelector('.profile__about'),
  profileAvatar: document.querySelector('.profile__avatar'),
};

const userInfo = new UserInfo(formProfileInfo);

api.getUserInfo()
  .then((user) => {
    userInfo.getUserInfo(user.name, user.info, user.avatar);
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

let userId = api.getUserInfo()
  .then((res) => {
    userId = res;
    });

//Форма с редактированием профиля
const openFormInfo = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
    loading(popupProfile);
    api.updateUserInfo(item.name, item.link)
      .then((res) => {
        userInfo.setUserInfo(res)
        openFormInfo.close()
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Функция открытия попапа с формой редактирования профиля
const openInfoForm = () => {
  buttonSubmitInfo.textContent = 'Сохранить';
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.info;
  validProfile.removeError(formElement);
  validProfile.toggleButtonState(inputList, buttonSubmitInfo);
  openFormInfo.open();
}

const delPicPopup = new Popup(popupDel);
delPicPopup.submit = function (_id) {
  delPicPopup.open();
  popupDel.addEventListener('submit', evt => {
    evt.preventDefault();
    document.getElementById(_id).remove();
    api.deleteCard(_id);
    this.close();
  });
};

const changeAvatar = new PopupWithForm(popupAvatar, {
  submitForm: (item) => {
    loading(popupAvatar);
    api.setUserAvatar(item.link)
      .then((item) => {
        userInfo.makeUserAvatar(item);
      })
      .then(() => {
        changeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

const CardList = new Section({
  renderer: (item) => {
    const card = new Card(template, () => api.putLike(item._id), () => api.deleteLike(item._id), {
      data: item, handleCardClick: () => {
        popupBigPicture.open(item);
      }
    }, () => delPicPopup.submit(item._id), {userId});
    const cardElement = card.generateCard();
    CardList.addItem(cardElement);
  }
}, photoCard);


api.getInitialCards()
    .then((items) => {
      CardList.renderItems(items);
    })
    .catch((err) => {
      console.log(err);
    });
//Функция открытия формы смены аватарки
const openNewAvatar = () => {
  buttonSubmitAvatar.textContent = 'Сохранить';
  validNewAvatar.removeError(popupAvatar);
  validNewAvatar.toggleButtonState(inputList, buttonSubmitAvatar);
  changeAvatar.open();
}

//Валидация форм
const validProfile = new FormValidator(formObject, formElement);
validProfile.enableValidation();

const validNewImage = new FormValidator(formObject, formImageElement);
validNewImage.enableValidation();

const validNewAvatar = new FormValidator(formObject, popupAvatar);
validNewAvatar.enableValidation();

editAvatar.addEventListener('click', () => openNewAvatar());
buttonAdd.addEventListener("click", () => openPicForm());
buttonEdit.addEventListener("click", () => openInfoForm());
