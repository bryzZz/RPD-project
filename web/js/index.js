'use strict';

// так можно объявлять функцию которую можно будет использовать в python
// eel.expose(js_random);
// function js_random() {
//   return Math.random();
// }

const formContainer = document.querySelector('.formContainer');
formContainer.append(getForm(0));

const allData = {};

function createForm(formId, componentsList){
    const form = document.createElement('form');
    form.classList.add('form');

    let formInner = '';
    for(let i = 0; i < componentsList.length; i++){
        let name = componentsList[i]?.name,
            text = componentsList[i]?.text,
            inputType = componentsList[i]?.inputType,
            inputValue = componentsList[i]?.inputValue,
            datalist = componentsList[i]?.datalist,
            placeholder = componentsList[i]?.placeholder,
            required = componentsList[i]?.required;

        let formItem = `
        <div class="form__field ${name}">
            <p class="${name}__text">${text}:</p>
            <input ${datalist ? 'list=' + '\"' + name + '\"' : ''} type="${inputType}" name="${name}" tabindex="${i}" value="${inputValue}" placeholder="${placeholder}" ${required ? 'required' : ''}">
        `;

        if(datalist){
            formItem += `<datalist id="${name}">`;

            datalist.forEach(item => {
                formItem += `<option value="${item}">`;
            });

            formItem += `</datalist>`;
        }

        formItem += '</div>';

        formInner += formItem;
    }

    form.innerHTML = `<div class="form__fields">
        <input id="image-file" type="file" />
        ${formInner}
        <div class="form__navigation">
            ${formId === 0 ? '<button class="exit">Выход</button>' : '<button class="back">Назад</button>'}
            <button type="submit" class="next">Дальше</button>
        </div>
    </div>`;

    if(formId !== 0){
        form.querySelector('.back').addEventListener('click', (e) => {
            setNewForm(formId - 1);
        });
    }

    // событие которое сработает когда форма отправится
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // отмена перезагрузки при отправке

        setNewForm(1);
    
        const formData = Object.fromEntries(new FormData(e.target)); // получение данных из формы в JSON формате
        Object.assign(allData, formData);

        eel.myPrint(JSON.stringify(allData))(); // вызов фуекции из python
    });

    return form;
}

function setNewForm(formId){
    formContainer.innerHTML = '';
    formContainer.append(getForm(formId));
}

function getForm(formId){
    if(formId === 0){
        return createForm(formId, [
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
                inputValue: '',
                datalist: ['Экз.', 'Зачёт'],
                placeholder: '',
                required: true
            },
            {
                name: 'numberOfSemesters',
                text: 'Введите количество семестров',
                inputType: 'number',
                inputValue: '',
                datalist: ['1', '2'],
                placeholder: '',
                required: true
            }
        ]);
    }
    if(formId === 1){
        return createForm(formId, [
            {
                name: 'sseminarsHour',
                text: 'Введите количество на семенары',
                inputType: 'number',
                inputValue: '0',
                // datalist: ['1', '2'],
                placeholder: '',
                required: true
            }
        ]);
    }
}