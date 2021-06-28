'use strict';

import '../scss/style.scss';
import Form from './Form';

const formContainer = document.querySelector('.formContainer'); //находим на странице тот самый контейнер для форм

let allData = JSON.parse(localStorage.getItem('allData')) || {}; // Объект где будут храниться все будущие данные
localStorage.setItem('allData', JSON.stringify(allData));

setNewForm(formContainer, 0); // добавляем в этот контейнер новый элемент(1 форму)

// основная функция которая очищает контейнер форм и ложит туда новую
function setNewForm(container, formId){
    container.innerHTML = ''; // очистка внутренностей контейнера
    container.append(getForm(formId)); // добавление туда новой формы
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
                    inputValue: 'ЯРСК',
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
                    datalist: ['Экз.', 'Зачёт'],
                    placeholder: '',
                    required: true
                },
                {
                    name: 'numberOfSemesters',
                    text: 'Введите количество семестров',
                    inputType: 'number',
                    inputValue: '2',
                    datalist: ['1', '2'],
                    placeholder: '',
                    required: true
                }
            ],
            data: allData,
            objectToSaveData: allData,
            compliteFunction: submit,
            buttons: ['Далее']
        }).getForm();
    }else{
        for(let i = 0; i < allData.semesters.length; i++){ // показать какой семестр на странице
            if(!allData.semesters[i].complited){
                document.querySelector('.title').textContent = `${i+1} семестр`;
                document.querySelector('.title').classList.remove('center');
                break;
            }
        }

        let currentSem;
        for(let semester of allData.semesters){
            if(!semester.complited){
                currentSem = semester;
                break;
            }
        }

        if(formId === 1){
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
                data: currentSem,
                objectToSaveData: currentSem,
                compliteFunction: submit,
                buttons: ['Далее']
            }).getForm();
        }else{
            let currentTopic;
            if(currentSem.topics){
                for(let topic of currentSem.topics){
                    if(!topic.complited){
                        currentTopic = topic;
                        break;
                    }
                }
                currentSem.topics.push({complited: false});
                for(let topic of currentSem.topics){
                    if(!topic.complited){
                        currentTopic = topic;
                        break;
                    }
                }
            }else{
                currentSem.topics = [{complited: false, subtopicComplited: false}];
                currentTopic = currentSem.topics[0];
            }

            if(formId === 2){
                return new Form({
                    id: formId,
                    formClass: 'form',
                    fieldsArr: [
                        {
                            name: 'topicName',
                            text: 'Введите название темы',
                            inputType: 'text',
                            inputValue: '',
                            placeholder: '',
                            required: true
                        },
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
                    data: currentTopic,
                    objectToSaveData: currentTopic,
                    compliteFunction: submit,
                    againFunction: showOneMore,
                    buttons: ['Закончить', 'Далее']
                }).getForm();
            }else{
                let currentTopic;
                if(currentSem.topics){
                    for(let topic of currentSem.topics){
                        if(!topic.complited){
                            currentTopic = topic;
                            break;
                        }
                    }
                    currentSem.topics.push({complited: false});
                    for(let topic of currentSem.topics){
                        if(!topic.complited){
                            currentTopic = topic;
                            break;
                        }
                    }
                }else{
                    currentSem.topics = [{complited: false}];
                    currentTopic = currentSem.topics[0];
                }

                if(formId === 3){
                    return new Form({
                        id: formId,
                        formClass: 'form',
                        fieldsArr: [
                            {
                                name: 'topicName',
                                text: 'Введите название темы',
                                inputType: 'text',
                                inputValue: '',
                                placeholder: '',
                                required: true
                            }
                        ],
                        data: currentTopic,
                        objectToSaveData: currentTopic,
                        compliteFunction: submit,
                        againFunction: showOneMore,
                        buttons: ['Закончить', 'Далее']
                    }).getForm();
                }
            } 
        }
    }

    function submit (e, formData) {
        e.preventDefault();
        for(const [key, value] of Object.entries(formData)){
            this._objectToSaveData[key] = value;
        }

        if(this._id === 0){ // если форма первая то информация просто идёт в общий объект
            if(!this._objectToSaveData.semesters){
                const semesters = [];
                for(let i = 0; i < this._objectToSaveData.numberOfSemesters; i++){
                    semesters.push({semesterId: i, complited: false});
                }
                this._objectToSaveData.semesters = semesters;
            }

        }else if(this._id === 1){
            
        }else if(this._id === 2){
            this._objectToSaveData.complited = true;
        }

        setNewForm(formContainer, this._id + 1); // показ следующеей формы
    
        localStorage.setItem('allData', JSON.stringify(allData));
    }

    function showOneMore (e, formData){
        for(const [key, value] of Object.entries(formData)){
            this._objectToSaveData[key] = value;
        }
        
        this._objectToSaveData.complited = true;

        setNewForm(formContainer, this._id);
    
        localStorage.setItem('allData', JSON.stringify(allData));
    }

    return;
}