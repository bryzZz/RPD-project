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
    const form = getForm(formId);
    if(form){
        container.append(form); // добавление туда новой формы
        formContainer.querySelectorAll('.form__field-input')[0].select();
    }
}

// функция которая возвращает форму по её id
function getForm(formId){
    if(formId === 0){ // first part start
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
    }else if(formId === 1){
        let currentSem;
        for(const semester of allData.semesters){ // показать какой семестр на странице
            if(!semester.complited){
                title.textContent = `${+semester.semesterId + 1} семестр`;
                title.classList.remove('center');

                currentSem = semester;
                break;
            }
        }
        
        //end of first part
        if(currentSem === undefined){
            allComplitedFieldsToFalse(allData);
            console.log(allData);

            setNewForm(formContainer, 4)
            // title.textContent = 'that it, check console';
            // console.log(allData);
            // container.innerHTML += '<button class="downloadFile">download docx file</button>';
            // const downloadDocxFile = document.querySelector('.downloadFile');
            // downloadDocxFile.addEventListener('click', (e) => generateDocxFile(allData));
            return;
        }

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
    }else if(formId === 2){
        let currentTopic;
        for(const semester of allData.semesters){
            if(!semester.complited){
                if(!semester.isTopicsComplited){
                    semester.topics.push({complited: false, subtopics: []});
                    currentTopic = semester.topics[semester.topics.length - 1];
                }else{
                    for(const topic of semester.topics){
                        if(!topic.complited){
                            currentTopic = topic;
                            break;
                        }
                    }
                }

                break;
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
                },
                {
                    name: 'independentWorkType',
                    text: 'Введите вид самостоятельные работы',
                    inputType: 'textarea',
                    inputValue: '',
                    placeholder: 'Вид самостоятельные работы',
                    // correctRegExp: /.|\s/gm
                },
                {
                    name: 'educationalAndMethodologicalSupportOfIndependentWork',
                    text: 'Введите учебно-методическое обеспечение самостоятельной работы',
                    inputType: 'textarea',
                    inputValue: '',
                    placeholder: 'Учебно-методическое обеспечение самостоятельной работы',
                    // correctRegExp: /.|\s/gm
                },
            ],
            data: currentTopic,
            objectToSaveData: currentTopic,
            buttons: [['Далее', showOneMore], ['Закончить', submit]]
        }).getForm();
    }else if(formId === 3){
        let currentTopic, currentSem;
        for(const semester of allData.semesters){
            if(!semester.complited){
                for(const topic of semester.topics){
                    if(!topic.complited){
                        currentTopic = topic;
                        break;
                    }
                }
                currentSem = semester;
                break;
            }
        }

        if(currentTopic === undefined){
            //end of each semester
            currentSem.complited = true;
            setNewForm(formContainer, 1);
            return;
        }

        currentTopic.subtopics.push({});
        let currentSubtopic = currentTopic.subtopics[currentTopic.subtopics.length - 1];

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
            data: currentSubtopic,
            objectToSaveData: currentSubtopic,
            buttons: [['Далее', showOneMore], ['Закончить', submit]]
        }).getForm();
    }else if(formId === 4){ // second part start
        // const topic = topicsGenerator();

        let currentTopic, currentSem;
        for(const semester of allData.semesters){
            if(!semester.complited){
                for(const topic of semester.topics){
                    if(!topic.complited && +topic.independentWorkHour > 0){
                        currentTopic = topic;
                        break;
                    }
                }
                currentSem = semester;
                break;
            }
        }

        title.textContent = `${+currentSem.semesterId + 1} семестр`;

        const subtopics = [];
        for(const subtopic of currentTopic){
            if(+subtopic.independentWorkHour > 0){
                subtopics.push(
                    {
                        name: subtopic.subtopicName,
                        text: 'Введите название дисциплины',
                        inputType: 'text',
                        inputValue: 'ЯРСК',
                        placeholder: 'ЯРСК',
                        correctRegExp: /^([a-zа-яё.\s]+)$/i
                    }
                );
            }
        }

        return new Form({
            id: formId,
            formClass: 'form',
            legend: `\"План внеаудиторной самостоятельной работы обучающихся по дисциплине\" \n Тема ${currentTopic.topicName} - общее количество часов на самостоятельные работы: ${currentTopic.independentWorkHour}`,
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
            ],
            data: allData,
            objectToSaveData: allData,
            buttons: [['Далее', submit], ['download docx file', generateDocxFile(allData)]]
        }).getForm();
    }

    function submit (self) {
        if(self._id === 0){ // если форма первая то информация просто идёт в общий объект
            if(!self._objectToSaveData.semesters){
                const semesters = [];
                for(let i = 0; i < self._objectToSaveData.numberOfSemesters; i++){
                    semesters.push({semesterId: i, complited: false, topics:[], isTopicsComplited: false});
                }
                self._objectToSaveData.semesters = semesters;
            }

        }else if(self._id === 2){
            for(let semester of allData.semesters){
                if(!semester.complited){
                    semester.isTopicsComplited = true;
                    break;
                }
            }
        }else if(self._id === 3){
            for(let semester of allData.semesters){
                if(!semester.complited){
                    for(let topic of semester.topics){
                        if(!topic.complited){
                            
                            topic.complited = true;
                
                            intermediateResult(container, allData);
                            setNewForm(formContainer, self._id);
                    
                            localStorage.setItem('allData', JSON.stringify(allData));

                            return;
                        }
                    }
                    break;
                }
            }
        }

        intermediateResult(container, allData);
        setNewForm(formContainer, self._id + 1); // показ следующеей формы

        localStorage.setItem('allData', JSON.stringify(allData));
    }

    function showOneMore (self){
        intermediateResult(container, allData);
        setNewForm(formContainer, self._id);
    
        localStorage.setItem('allData', JSON.stringify(allData));
    }

    function allComplitedFieldsToFalse(data){
        for(const field in data){
            if(data[field] instanceof Object){
                allComplitedFieldsToFalse(data[field]);
            }
            if(field === 'complited'){
                data[field] = false;
            }
        }
    }

    return;
}

function* topicsGenerator(){
    for(const semester of allData.semesters){
        for(const topic of semester.topics){
            yield topic;
        }
    }
}