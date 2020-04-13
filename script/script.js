let buttonEdit = document.querySelector('.button__edit');
let popup = document.querySelector('.popup');

function addPopup () {
  popup.classList.add('popup_opened');
}
buttonEdit.addEventListener('click', addPopup);

let buttonClose = document.querySelector('.button__close-item');

function removePopup () {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', removePopup);

// Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('#fullname'); // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector('#about'); // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

let buttonSave = document.querySelector('.button__submit');

function removePopup () {
  popup.classList.remove('popup_opened');
}
buttonSave.addEventListener('click', removePopup);
