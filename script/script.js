const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupProfile = document.querySelector('#popup-profile');
const popupNewImages = document.querySelector('#popup-new-images');
const popupBigImage = document.querySelector('#popup-big-image');
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

//Выбираем шаблон фотографий
const photoTemplate = document.querySelector('#photo').content;
const photoCard = document.querySelector('.photos');

//Отвечает за открытие/закрытие попапов
function changePopup (elem) {
  elem.classList.toggle('popup_opened');
}

//Функция создания карточки
function addCard (name, link) {
  const photoElement = photoTemplate.cloneNode(true);
  const image = photoElement.querySelector('.photo__image');
  image.src = link;
  image.alt = `Фото ${name}.`;
  image.dataset.name = name;
  photoElement.querySelector('.photo__name').textContent = name;

  //Функция активации кнопки like
  photoElement.querySelector('.button_like').addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('button_like-active');
  });

  //Функция удаления фотографий
  photoElement.querySelector('.button_del').addEventListener('click', function(evt) {
    const photoDel = evt.target;
    photoDel.closest('.photo').remove();
  });

  //Функция увеличения фотографий
  photoElement.querySelector('.photo__image').addEventListener('click', function(evt) {
    const item = evt.target;
    bigImage.src = item.src;
    bigImage.alt = `Фото ${item.dataset.name}.`;
    bigImageTitle.textContent = item.dataset.name;
    changePopup(popupBigImage);
  });
  return photoElement;
}

//Функция для добавления карточек из массива
initialCards.forEach(function(item) {
  photoCard.append(addCard(item.name, item.link));
});

//Функия для сохранения новой фотографии
function submitImage (evt) {
  evt.preventDefault();
  photoCard.prepend(addCard(titleInput.value, linkInput.value));
  changePopup(popupNewImages);
}

//Отвечает за открытие попапа с редактированием профиля
function openPopupProfile () {
  changePopup(popupProfile);
  if (popupProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
  }
}

//Отвечает за открытие попапа с добавлением фото
function openPopupNewImages () {
  changePopup(popupNewImages);
  titleInput.value = '';
  linkInput.value = '';
}

//Функция для сохранения редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    changePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);
formImageElement.addEventListener('submit', submitImage);
buttonEdit.addEventListener('click', openPopupProfile);
buttonAdd.addEventListener('click', openPopupNewImages);
buttonCloseProfile.addEventListener('click', () => changePopup(popupProfile));
buttonCloseNewImages.addEventListener('click', () => changePopup(popupNewImages));
buttonCloseBig.addEventListener('click', () => changePopup(popupBigImage));
