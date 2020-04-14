let buttonEdit = document.querySelector('.button__edit');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let nameInput = document.querySelector('#fullname');
let jobInput = document.querySelector('#about');

function addPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}
buttonEdit.addEventListener('click', addPopup);

let buttonClose = document.querySelector('.button__close-item');
function removePopup () {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', removePopup);

let formElement = document.querySelector('.form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    removePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

