'use strict';

// так можно объявлять функцию которую можно будет использовать в python
// eel.expose(js_random);
// function js_random() {
//   return Math.random();
// }

// событие которое сработает когда форма отправится
document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault(); // отмена перезагрузки при отправке

    const formData = JSON.stringify(Object.fromEntries(new FormData(e.target))); // получение данных из формы в JSON формате

    eel.myPrint(formData)(); // вызов фуекции из python
});