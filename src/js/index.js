'use strict';

import '../css/style.css';
import setNewForm from './forms';

const formContainer = document.querySelector('.formContainer'); //находим на странице тот самый контейнер для форм

let allData = JSON.parse(localStorage.getItem('allData')) || {semesters: []}; // Объект где будут храниться все будущие данные
localStorage.setItem('allData', JSON.stringify(allData));

setNewForm(formContainer, 0); // добавляем в этот контейнер новый элемент(1 форму)