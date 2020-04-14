const button = document.querySelector('.profile__button-small');
const close = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.form__name-input');
const jobInput = document.querySelector('.form__profession-input');
const profile__title = document.getElementById('profile__title');
const profile__subtitle = document.getElementById('profile__subtitle');
profile__title.getAttribute('value');
profile__subtitle.getAttribute('value');
const popup = document.querySelector('.popup')
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profile__title.textContent;
    jobInput.value = profile__subtitle.textContent;
}
button.addEventListener('click', showPopup);
function closePopup() {
    popup.classList.remove('popup_opened');
}
close.addEventListener('click', closePopup);
const formElement = popup.querySelector('.form');
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    profile__title.textContent = nameInput.value;
    profile__subtitle.textContent = jobInput.value;
}
const form__button_save = document.querySelector('.form__button_save');
function closePopup() {
    popup.classList.remove('popup_opened');
}
form__button_save.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);



const button = document.querySelector('.profile__button-small');
const close = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.form__name-input');
const jobInput = document.querySelector('.form__profession-input');
const profile__title = document.getElementById('profile__title');
const profile__subtitle = document.getElementById('profile__subtitle');
profile__title.getAttribute('value');
profile__subtitle.getAttribute('value');
const popup = document.querySelector('.popup')
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profile__title.textContent;
    jobInput.value = profile__subtitle.textContent;
}
button.addEventListener('click', showPopup);
function closePopup() {
    popup.classList.remove('popup_opened');
}
close.addEventListener('click', closePopup);
const formElement = popup.querySelector('.form');
const form__button_save = document.querySelector('.form__button_save');
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    profile__title.textContent = nameInput.value;
    profile__subtitle.textContent = jobInput.value;
    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);

