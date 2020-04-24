const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupProfile = document.querySelector('#popup__profile');
const popupNewImages = document.querySelector('#popup__new-images');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');
const titleInput = document.querySelector('#place-title');
const linkInput = document.querySelector('#image-link');
const buttonCloseProfile = document.querySelector('#close__profile');
const buttonCloseNewImages = document.querySelector('#close__new-images');
const formElement = document.querySelector('.form');

//Отвечает за открытие/закрытие попапа с редактированием профиля
function changePopupProfile () {
  if (popupProfile.classList.contains('popup_opened')) {
    popupProfile.classList.remove('popup_opened');
  } else {
    popupProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
  }
}

//Отвечает за открытие/закрытие попапа с добавлением фото
function changePopupNewImages () {
  popupNewImages.classList.toggle('popup_opened');
  titleInput.value = '';
  linkInput.value = '';
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    changePopupProfile();
}
formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', changePopupProfile);
buttonAdd.addEventListener('click', changePopupNewImages);
buttonCloseProfile.addEventListener('click', changePopupProfile);
buttonCloseNewImages.addEventListener('click', changePopupNewImages);
