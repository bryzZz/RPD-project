'use strict';

import '../scss/style.scss';
import Form from './Form';
import intermediateResult from './intermediateResult';
import generateDocxFile from './generateDocxFile';

const container = document.querySelector('.container'),
      formContainer = document.querySelector('.formContainer'), //находим на странице тот самый контейнер для форм
      title = document.querySelector('.title');

localStorage.clear();
let allData = JSON.parse(localStorage.getItem('allData')) || {}; // Объект где будут храниться все будущие данные
localStorage.setItem('allData', JSON.stringify(allData));

setNewForm(formContainer, 0); // добавляем в этот контейнер новый элемент(1 форму)

// основная функция которая очищает контейнер форм и ложит туда новую
function setNewForm(container, formId){
    container.innerHTML = ''; // очистка внутренностей контейнера
    container.append(getForm(formId)); // добавление туда новой формы
    formContainer.querySelectorAll('.form__field-input')[0].select();
}

// функция которая возвращает форму по её id
function getForm(formId){
    // console.log(allData);
    // сотрим какой id и возвращаем новую форму
    if(formId === 0){
        title.textContent = 'РПД IV пункт';
        title.classList.add('center');

        return new Form({
            id: formId,
            formClass: 'form',
            legend: 'Начало',
            fieldsArr: [
                {
                    name: 'disciplineName',
                    text: 'Введите название дисциплины',
                    inputType: 'text',
                    inputValue: 'ЯРСК',
                    placeholder: 'ЯРСК',
                    correctRegExp: /^([a-zа-яё.\s]+)$/i
                },
                {
                    name: 'laborIntensity',
                    text: 'Введите трудоёмкость дисциплины',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '0',
                    correctRegExp: /^[0-9]+$/
                },
                {
                    name: 'numberOfHoursAll',
                    text: 'Введите количество часов',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '0',
                    correctRegExp: /^[0-9]+$/
                },
                {
                    name: 'examHours',
                    text: 'Введите количество часов на экзамен',
                    inputType: 'number',
                    inputValue: '0',
                    placeholder: '0',
                    correctRegExp: /^[0-9]+$/
                },
                {
                    name: 'finalExamination',
                    text: 'Введите форму итоговой аттестации',
                    inputType: 'text',
                    inputValue: 'Экз.',
                    datalist: ['Экз.', 'Зачёт'],
                    placeholder: '',
                    correctRegExp: /^([a-zа-яё.\s]+)$/i
                },
                {
                    name: 'numberOfSemesters',
                    text: 'Введите количество семестров',
                    inputType: 'number',
                    inputValue: '2',
                    datalist: ['1', '2'],
                    placeholder: '',
                    correctRegExp: /^(?=.{1}$)(1|2)+$/
                }
            ],
            data: allData,
            objectToSaveData: allData,
            buttons: [['Далее', submit]]
        }).getForm();
    }else{
        for(let i = 0; i < allData.semesters.length; i++){ // показать какой семестр на странице
            if(!allData.semesters[i].complited){
                document.querySelector('.title').textContent = `${i+1} семестр`;
                document.querySelector('.title').classList.remove('center');
                break;
            }
        }

        let currentSem; // находим первый незаполненый семестр
        for(let semester of allData.semesters){
            if(!semester.complited){
                currentSem = semester;
                break;
            }
        }
        
        if(currentSem === undefined){
            document.querySelector('.title').textContent = 'that it, check console';
            console.log(allData);
            container.innerHTML += '<button class="downloadFile">download docx file</button>';
            const downloadDocxFile = document.querySelector('.downloadFile');
            downloadDocxFile.addEventListener('click', (e) => generateDocxFile(allData));
            return;
        }

        if(formId === 1){
            return new Form({
                id: formId,
                formClass: 'form',
                legend: 'Семестр',
                fieldsArr: [
                    {
                        name: 'lecturesHour',
                        text: 'Введите количество на лекции',
                        inputType: 'number',
                        inputValue: '0',
                        placeholder: '',
                        correctRegExp: /^[0-9]+$/
                    },
                    {
                        name: 'seminarsHour',
                        text: 'Введите количество на семинары',
                        inputType: 'number',
                        inputValue: '0',
                        placeholder: '',
                        correctRegExp: /^[0-9]+$/
                    },
                    {
                        name: 'consultationsHour',
                        text: 'Введите количество на консультации',
                        inputType: 'number',
                        inputValue: '0',
                        placeholder: '',
                        correctRegExp: /^[0-9]+$/
                    },
                    {
                        name: 'independentWorkHour',
                        text: 'Введите количество на самостоятельные работы',
                        inputType: 'number',
                        inputValue: '0',
                        placeholder: '',
                        correctRegExp: /^[0-9]+$/
                    }
                ],
                data: currentSem,
                objectToSaveData: currentSem,
                buttons: [['Далее', submit]]
            }).getForm();
        }else{
            if(formId === 2){
                let currentTopic;
                if(!currentSem.isTopicsComplited){
                    currentSem.topics.push({complited: false, subtopics: []});
                    currentTopic = currentSem.topics[currentSem.topics.length - 1];
                }else{
                    for(let topic of currentSem.topics){
                        if(!topic.complited){
                            currentTopic = topic;
                            break;
                        }
                    }
                }

                return new Form({
                    id: formId,
                    formClass: 'form',
                    legend: 'Раздел',
                    fieldsArr: [
                        {
                            name: 'topicName',
                            text: 'Введите название раздела',
                            inputType: 'text',
                            inputValue: '',
                            placeholder: '',
                            correctRegExp: /^([a-zа-яё.\-\s]+)$/i
                        },
                        {
                            name: 'lecturesHour',
                            text: 'Введите количество на лекции',
                            inputType: 'number',
                            inputValue: '0',
                            placeholder: '',
                            correctRegExp: /^[0-9]+$/
                        },
                        {
                            name: 'seminarsHour',
                            text: 'Введите количество на семинары',
                            inputType: 'number',
                            inputValue: '0',
                            placeholder: '',
                            correctRegExp: /^[0-9]+$/
                        },
                        {
                            name: 'consultationsHour',
                            text: 'Введите количество на консультации',
                            inputType: 'number',
                            inputValue: '0',
                            placeholder: '',
                            correctRegExp: /^[0-9]+$/
                        },
                        {
                            name: 'independentWorkHour',
                            text: 'Введите количество на самостоятельные работы',
                            inputType: 'number',
                            inputValue: '0',
                            placeholder: '',
                            correctRegExp: /^[0-9]+$/
                        }
                    ],
                    data: currentTopic,
                    objectToSaveData: currentTopic,
                    buttons: [['Далее', showOneMore], ['Закончить', submit]]
                }).getForm();
            }else{
                if(formId === 3){
                    let currentTopic;
                    for(let topic of currentSem.topics){
                        if(!topic.complited){
                            currentTopic = topic;
                            break;
                        }
                    }

                    if(currentTopic === undefined){
                        currentSem.complited = true;
                        setNewForm(formContainer, 1);
                        return;
                    }

                    currentTopic.subtopics.push({});
                    let currentSubtopics = currentTopic.subtopics[currentTopic.subtopics.length - 1];

                    return new Form({
                        id: formId,
                        formClass: 'form',
                        legend: 'Тема раздела \"' + currentTopic.topicName + '\"',
                        fieldsArr: [
                            {
                                name: 'subtopicName',
                                text: 'Введите название темы',
                                inputType: 'text',
                                inputValue: '',
                                placeholder: '',
                                correctRegExp: /^([a-zа-яё.\-\s]+)$/i
                            },
                            {
                                name: 'lecturesHour',
                                text: 'Введите количество на лекции',
                                inputType: 'number',
                                inputValue: '0',
                                placeholder: '',
                                correctRegExp: /^[0-9]+$/
                            },
                            {
                                name: 'seminarsHour',
                                text: 'Введите количество на семинары',
                                inputType: 'number',
                                inputValue: '0',
                                placeholder: '',
                                correctRegExp: /^[0-9]+$/
                            },
                            {
                                name: 'consultationsHour',
                                text: 'Введите количество на консультации',
                                inputType: 'number',
                                inputValue: '0',
                                placeholder: '',
                                correctRegExp: /^[0-9]+$/
                            },
                            {
                                name: 'independentWorkHour',
                                text: 'Введите количество на самостоятельные работы',
                                inputType: 'number',
                                inputValue: '0',
                                placeholder: '',
                                correctRegExp: /^[0-9]+$/
                            },
                            {
                                name: 'formsOfMonitoringProgress',
                                text: 'Формы текущего контроля успеваемости',
                                inputType: 'text',
                                inputValue: '',
                                placeholder: '',
                                correctRegExp: /^([a-zа-яё0-9,\s]+)$/i
                            }
                        ],
                        data: currentSubtopics,
                        objectToSaveData: currentSubtopics,
                        buttons: [['Далее', showOneMore], ['Закончить', submit]]
                    }).getForm();
                }
            } 
        }
    }

    function submit (formData, self) {
        for(const [key, value] of Object.entries(formData)){
            self._objectToSaveData[key] = value;
        }

        if(self._id === 0){ // если форма первая то информация просто идёт в общий объект
            if(!self._objectToSaveData.semesters){
                const semesters = [];
                for(let i = 0; i < self._objectToSaveData.numberOfSemesters; i++){
                    semesters.push({semesterId: i, complited: false, topics:[], isTopicsComplited: false});
                }
                self._objectToSaveData.semesters = semesters;
            }

        }else{
            let currentSem, currentTopic;
            for(let semester of allData.semesters){
                if(!semester.complited){
                    currentSem = semester;
                    break;
                }
            }
            for(let topic of currentSem.topics){
                if(!topic.complited){
                    currentTopic = topic;
                    break;
                }
            }
            if(self._id === 2){
                currentSem.isTopicsComplited = true;
            }
            else if(self._id === 3){
                currentTopic.complited = true;
                
                intermediateResult(container, allData);
                setNewForm(formContainer, self._id);
        
                localStorage.setItem('allData', JSON.stringify(allData));
    
                return;
            }
        }

        intermediateResult(container, allData);
        setNewForm(formContainer, self._id + 1); // показ следующеей формы

        localStorage.setItem('allData', JSON.stringify(allData));
    }

    function showOneMore (formData, self){
        for(const [key, value] of Object.entries(formData)){
            self._objectToSaveData[key] = value;
        }

        intermediateResult(container, allData);
        setNewForm(formContainer, self._id);
    
        localStorage.setItem('allData', JSON.stringify(allData));
    }

    return;
}