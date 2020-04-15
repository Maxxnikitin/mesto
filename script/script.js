const buttonEdit = document.querySelector('.button_edit');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');
const buttonClose = document.querySelector('.button_close-item');
const formElement = document.querySelector('.form');

function changePopup () {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
  }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    changePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', changePopup);
buttonClose.addEventListener('click', changePopup);
