import {formObject} from '../../pages/index.js';

//Функция удаления текста ошибок при открытии формы
export function removeError(elem) {
  elem.querySelectorAll('.form__input-error').forEach((span) => {
    span.classList.remove(formObject.errorClass);
    span.textContent = '';
  });
  elem.querySelectorAll(formObject.inputSelector).forEach((input) => {
    input.classList.remove(formObject.inputErrorClass);
  });
}

//Функция блокировки кнопки при открытии попапа
export function disabledButton (elem) {
  elem.querySelector('.button_submit').classList.add('form__submit-inactive');
  elem.querySelector('.button_submit').disabled = true;
}
