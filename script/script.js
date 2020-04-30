const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupProfile = document.querySelector('#popup__profile');
const popupNewImages = document.querySelector('#popup__new-images');
const popupBigImage = document.querySelector('#popup__big-image');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');
const titleInput = document.querySelector('#place-title');
const linkInput = document.querySelector('#image-link');
const buttonCloseProfile = document.querySelector('#close__profile');
const buttonCloseNewImages = document.querySelector('#close__new-images');
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
      alt: 'фото Алтая.'
  },
  {
      name: 'Байкал',
      link: './images/photos/baikal.jpg',
      alt: 'Фото Байкала.'
  },
  {
      name: 'Домбай',
      link: './images/photos/dombai.jpg',
      alt: 'Фото Домбая.'
  },
  {
      name: 'Эльбрус',
      link: './images/photos/elbrus.jpg',
      alt: 'Фото Эльбруса.'
  },
  {
      name: 'Архыз',
      link: './images/photos/arkhyz.jpg',
      alt: 'Фото Архыза.'
  },
  {
      name: 'Хакасия',
      link: './images/photos/khakassia.jpg',
      alt: 'Фото Хакасии.'
  }
];

//Отвечает за открытие/закрытие попапа с увеличением фото
function changePopupBigImage () {
  popupBigImage.classList.toggle('popup_opened');
};

//Выбираем шаблон фотографий
const photoTemplate = document.querySelector('#photo').content;
const photoCard = document.querySelector('.photos');

//Создаём цикл для перебора массива и добавления сразу 6-ти фотографий
initialCards.forEach(function(item) {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.photo__image').src = item.link;
  photoElement.querySelector('.photo__image').alt = item.alt;
  photoElement.querySelector('.photo__name').textContent = item.name;
  photoElement.querySelector('.photo__image').dataset.name = item.name;

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
    bigImage.alt = item.dataset.name;
    bigImageTitle.textContent = item.dataset.name;
    changePopupBigImage();
  });

  photoCard.append(photoElement);
});

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

//Функция для сохранения редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    changePopupProfile();
}

//Функия для сохранения новой фотографии
function submitImage (evt) {
  evt.preventDefault();
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.photo__image').src = linkInput.value;
  photoElement.querySelector('.photo__image').alt = '"Фото " + linkInput.value + "."';
  photoElement.querySelector('.photo__name').textContent = titleInput.value;
  photoCard.prepend(photoElement);
  changePopupNewImages();
}

formElement.addEventListener('submit', formSubmitHandler);
formImageElement.addEventListener('submit', submitImage);
buttonEdit.addEventListener('click', changePopupProfile);
buttonAdd.addEventListener('click', changePopupNewImages);
buttonCloseProfile.addEventListener('click', changePopupProfile);
buttonCloseNewImages.addEventListener('click', changePopupNewImages);
buttonCloseBig.addEventListener('click', changePopupBigImage);