const formContainer = document.querySelector('.formContainer'); //находим на странице тот самый контейнер для форм

// основная функция которая очищает контейнер форм и ложит туда новую
function setNewForm(formContainer, formId){
    formContainer.innerHTML = ''; // очистка внутренностей контейнера
    formContainer.append(getForm(formId)); // добавление туда новой формы
}
// функция которая возвращает форму по её id
function getForm(formId){
    // сотрим какой id и возвращаем новую форму
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

    return;
}

// функция которая делает форму, в неё передаётся id формы и список компонентов
function createForm(formId, componentsList){
    const form = document.createElement('form'); // создание новой пустой формы
    form.classList.add('form');// добавление этой форме класса

    let formInner = ''; // тут будет внутренняя вёрска для формы
    for(let i = 0; i < componentsList.length; i++){ // цикл переберёт все переданные элементы
        // вытаскиваем переменные из элемента
        let name = componentsList[i]?.name,
            text = componentsList[i]?.text,
            inputType = componentsList[i]?.inputType,
            inputValue = componentsList[i]?.inputValue,
            datalist = componentsList[i]?.datalist,
            placeholder = componentsList[i]?.placeholder,
            required = componentsList[i]?.required;

        let allData = JSON.parse(localStorage.getItem('allData'));

        // созжание вёрски элемента "${}" так можно вставлять переменные в строку
        let formItem = `
        <div class="form__field ${name}">
            <p class="${name}__text">${text}:</p>
            <input ${datalist ? 'list=' + '\"' + name + '\"' : ''} type="${inputType}" name="${name}" tabindex="${i}" value="${allData[name] ? allData[name] : inputValue}" placeholder="${placeholder}" ${required ? 'required' : ''}">
        `;

        // если для элемента есть варианты выбора то вставялем и их в вёрстку
        if(datalist){
            formItem += `<datalist id="${name}">`;

            datalist.forEach(item => {
                formItem += `<option value="${item}">`;
            });

            formItem += `</datalist>`;
        }

        formItem += '</div>'; // закрываем вёрску элемента

        formInner += formItem; // добавляем вёрску элемента во внутрь формы
    }

    // вёрска внутри всеё формы
    form.innerHTML = `<div class="form__fields">
        ${formId === 0 ? '<input id="image-file" type="file" />' : ''}
        ${formInner}
        <div class="form__navigation">
            ${formId === 0 ? '<button class="exit">Выход</button>' : '<button class="back">Назад</button>'}
            <button type="submit" class="next">Дальше</button>
        </div>
    </div>`;

    // если форма не первая то должна быть кнопка назад, находим её и вешаем на нее событие выова предыдущей формы
    if(formId !== 0){
        form.querySelector('.back').addEventListener('click', (e) => {
            setNewForm(formContainer, formId - 1);
        });
    }

    // событие которое сработает когда форма отправится
    form.addEventListener('submit', (e) => {
        let allData = JSON.parse(localStorage.getItem('allData'));

        e.preventDefault(); // отмена перезагрузки при отправке

        setNewForm(formContainer, formId + 1); // показ следующеей формы
    
        const formData = Object.fromEntries(new FormData(e.target)); // получение данных из формы в JSON формате

        allData = {...allData, ...formData}; // включение данных из формы в общий объект
        localStorage.setItem('allData', JSON.stringify(allData));

        console.log(allData);
    });

    return form;
}

export default setNewForm;