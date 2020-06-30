export class FormValidator {
  constructor(settings, element) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._element = element;
  }

  //Функция добавления класса с ошибкой
  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Функция удаления класса с ошибкой
  hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Функция проверки валидности поля
  _isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  };

  // Функция проверки валидности полей
  _hasInvalidInput (inputList) {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  };

  // Функция активации кнопки
  toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
  };

  //Функция удаления ошибок при открытии попапа
  removeError(elem) {
    elem.querySelectorAll('.form__input-error').forEach((span) => {
      span.classList.remove('form__input-error_active');
      span.textContent = '';
    });
    elem.querySelectorAll('.form__input').forEach((input) => {
      input.classList.remove('form__input_type_error');
    });
  };

  // Добавляем слушателя всем инпутам формы
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this.toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._element);
  }
}
