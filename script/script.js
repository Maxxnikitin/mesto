const buttonEdit = document.querySelector('.button__edit');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#about');

function addPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}
buttonEdit.addEventListener('click', addPopup);

const buttonClose = document.querySelector('.button__close-item');
function removePopup () {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', removePopup);

const formElement = document.querySelector('.form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    removePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
