// eslint-disable-next-line strict
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import toggleModal from './modules/toggleModal';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calculator from './modules/calculator';
import formValidator from './modules/formValidator';
import sendForm from './modules/sendForm';

// таймер
countTimer('03 March 2021');

//меню
toggleMenu();

// модальное окно
toggleModal();

// табы
tabs();

// слайдер
slider();

// наша команда
ourTeam();

// калькулятор
calculator(100);

// валидация форм
formValidator();

// send-ajax-form
sendForm();
