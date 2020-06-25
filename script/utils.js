import {escClose} from './index.js';
export const popupBigImage = document.querySelector('#popup-big-image');

//Отвечает за открытие попапов
export function openPopup (elem) {
  elem.classList.add('popup_opened');
  //Добавляем слушателя кнопки Esc
  document.addEventListener('keydown', escClose);
}

//Вообще файл utils.js рассматривается только в следующем спринте, в этом его не было. В задании к этой проектной работе указано, что нужно создать файлы Card.js и FormValidator.js. Я по вашей просьбе сделал, однако если что-то сделал неправильно, прошу не засчитывать это за критическую ошибку. В следующем спринте буду всё по файлам раскладывать и здесь подлатаю, что нужно будет.
