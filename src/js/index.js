'use strict';

import '../css/style.css';
// import setNewForm from './forms';
import Form from './Form';

// console.log(new Form({
//     id: 0,
//     formClass: 'form',
//     fieldsArr: [
//         {
//             name: 'seminarsHour',
//             text: 'Введите количество на семенары',
//             inputType: 'number',
//             inputValue: '0',
//             datalist: [1, 2, 3],
//             placeholder: '',
//             required: false
//         },
//         {
//             name: 'lecturesHour',
//             text: 'Введите количество на лекции',
//             inputType: 'number',
//             inputValue: '0',
//             placeholder: '',
//             required: true
//         },
//     ],
//     data: {
//         seminarsHour: '28'
//     }
// }).getForm());

const formContainer = document.querySelector('.formContainer'); //находим на странице тот самый контейнер для форм

let allData = JSON.parse(localStorage.getItem('allData')) || {}; // Объект где будут храниться все будущие данные
localStorage.setItem('allData', JSON.stringify(allData));

setNewForm(formContainer, 0); // добавляем в этот контейнер новый элемент(1 форму)

// основная функция которая очищает контейнер форм и ложит туда новую
function setNewForm(formContainer, formId){
    formContainer.innerHTML = ''; // очистка внутренностей контейнера
    formContainer.append(getForm(formId)); // добавление туда новой формы
}
// функция которая возвращает форму по её id
function getForm(formId){
    // сотрим какой id и возвращаем новую форму
    if(formId === 0){
        return new Form({
            id: formId,
            formClass: 'form',
            fieldsArr: [
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
            ],
            data: allData,
            submitFunction: submit
        }).getForm();
    }
    if(formId === 1){
        let data;
        for(let semester of allData.semesters){
            if(!semester.complited){
                data = semester;
                break;
            }
        }

        return new Form({
            id: formId,
            formClass: 'form',
            fieldsArr: [
                {
                    name: 'seminarsHour',
                    text: 'Введите количество на семенары',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '',
                    required: true
                },
                {
                    name: 'lecturesHour',
                    text: 'Введите количество на лекции',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '',
                    required: true
                },
                {
                    name: 'consultationsHour',
                    text: 'Введите количество на консультации',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '',
                    required: true
                },
                {
                    name: 'independentWorkHour',
                    text: 'Введите количество на самостоятельные работы',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '',
                    required: true
                }
            ],
            data,
            submitFunction: submit
        }).getForm();
    }

    function submit (e) {
        e.preventDefault(); // отмена перезагрузки при отправке
    
        const formData = Object.fromEntries(new FormData(e.target)); // получение данных из формы в JSON формате
    
        if(formId === 0){ // если форма первая то информация просто идёт в общий объект
            allData = {...allData, ...formData};
            
            if(!allData.semesters){
                const semesters = [];
                for(let i = 0; i < allData.numberOfSemesters; i++){
                    semesters.push({semesterId: i, complited: false});
                }
                allData.semesters = semesters;
            }

            for(let i = 0; i < allData.semesters.length; i++){
                if(!allData.semesters[i].complited){
                    document.querySelector('.name').textContent = `${i+1} семестр`;
                    document.querySelector('.name').classList.remove('center');
                    break;
                }
            }
        }else{ // в другом случае информация идёт в семестр
            for(let i = 0; i < allData.semesters.length; i++){
                if(!allData.semesters[i].complited){
                    allData.semesters[i] = {...allData.semesters[i], ...formData};
                    break;
                }
            }
        }

        setNewForm(formContainer, formId + 1); // показ следующеей формы
    
        localStorage.setItem('allData', JSON.stringify(allData));
    }

    return;
}