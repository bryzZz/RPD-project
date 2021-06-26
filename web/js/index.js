'use strict';

// так можно объявлять функцию которую можно будет использовать в python
// eel.expose(js_random);
// function js_random() {
//   return Math.random();
// }

function getForm(componentsList){
    let form = '';

    for(let i = 0; i < componentsList.length; i++){
        let formItem = `
        <div class="form__field ${componentsList[i]?.name}">
            <p class="${componentsList[i]?.name}__text">${componentsList[i]?.text}:</p>
            <input type="${componentsList[i]?.inputType}" name="${componentsList[i]?.name}" tabindex="${i}" value="${componentsList[i]?.inputValue}" placeholder="${componentsList[i]?.placeholder}" ${componentsList[i]?.required ? 'required' : ''}>
        </div>
        `;
        form += formItem;
    }

    return form;
}

document.querySelector('.form__fields').innerHTML = getForm([
    {
        name: 'disciplineName',
        text: 'Введите название дисциплины',
        inputType: 'text',
        inputValue: '',
        placeholder: 'ЯРСК',
        required: true
    },
    {
        name: 'laborIntensity',
        text: 'Введите трудоёмкость дисциплины',
        inputType: 'number',
        inputValue: '0',
        placeholder: '0',
        required: true
    },
    {
        name: 'numberOfHoursAll',
        text: 'Введите количество часов',
        inputType: 'number',
        inputValue: '0',
        placeholder: '0',
        required: true
    },
    {
        name: 'examHours',
        text: 'Введите количество часов на экзамен',
        inputType: 'number',
        inputValue: '0',
        placeholder: '0',
        required: true
    },
    {
        name: 'finalExamination',
        text: 'Введите форму итоговой аттестации',
        inputType: 'text',
        inputValue: 'Экз.',
        placeholder: '',
        required: true
    }
]) + document.querySelector('.form__fields').innerHTML;

// событие которое сработает когда форма отправится
document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault(); // отмена перезагрузки при отправке

    const formData = JSON.stringify(Object.fromEntries(new FormData(e.target))); // получение данных из формы в JSON формате

    eel.myPrint(formData)(); // вызов фуекции из python
});