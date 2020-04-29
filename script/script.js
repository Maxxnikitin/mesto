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
const formElement = document.querySelector('#form-edit');
const formImageElement = document.querySelector('#form-image');

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
      name: 'Карачаевск',
      link: './images/photos/karachaevsk.jpg',
      alt: 'Фото Карачаевска.'
  },
  {
      name: 'Хакасия',
      link: './images/photos/khakassia.jpg',
      alt: 'Фото Хакасии.'
  }
];

//Выбираем шаблон фотографий
const photoTemplate = document.querySelector('#photo').content;
const photoCard = document.querySelector('.photos');

//Создаём цикл для перебора массива и добавления сразу 6-ти фотографий
initialCards.forEach(function(item) {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.photo__image').src = item.link;
  photoElement.querySelector('.photo__image').alt = item.alt;
  photoElement.querySelector('.photo__name').textContent = item.name;

  //Функция активации кнопки like
  photoElement.querySelector('.button_like').addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('button_like-active');
  });

  //Функция для удаления фотографий
  photoElement.querySelector('.button_del').addEventListener('click', function(evt) {
    const photoDel = evt.target;
    photoDel.closest('.photo').remove();
  })

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
