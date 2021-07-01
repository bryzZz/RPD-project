import {createElement} from './utils.js';

export default function intermediateResult(container, data){
    let inter = container.querySelector('.intermediateResultContainer') || createElement({tagName: 'div', className: 'intermediateResultContainer'});
    inter.innerHTML = '';

    //main header
    inter.append(
        createElement({
            tagName: 'h1',
            textContent: 'IV. СОДЕРЖАНИЕ И СТРУКТУРА ДИСЦИПЛИНЫ\n\n',
            styles: {
                fontSize: '12pt',
                fontWeight: 'bold'
            }
        }),
        createElement({
            tagName: 'p',
            textContent: `Трудоемкость дисциплины составляет ${data.laborIntensity} зачетных единиц, ${data.numberOfHoursAll} часов, ${data.examHours} часов на экзамен.\n\n`,
        }),
        createElement({
            tagName: 'p',
            textContent: `Форма промежуточной аттестации: ${data.finalExamination}\n`,
        }),
        createElement({
            tagName: 'h2',
            textContent: '4.1 Содержание дисциплины, структурированное по темам, c указанием видов учебных занятий и отведенного на них количества академических часов',
            styles: {
                fontSize: '12pt',
                fontWeight: 'bold'
            }
        }),
    );
    
    //first table
    let table1 = document.createElement('table');
    // first table header
    table1.innerHTML += `
        <thead>
            <tr>
                <td rowspan="3">п/п</td>
                <td rowspan="3">Раздел дисциплины/темы</td>
                <td rowspan="3">Семестр</td>
                <td colspan="4">Виды учебной работы, включая самостоятельную работу обучающихся и трудоемкость(в часах)</td>
                <td rowspan="3">Формы текущего контроля успеваемости; Форма промежуточной аттестации(по семестрам)</td>
            </tr>
            <tr>
                <td colspan="3">Контактная работа преподавателя с обучающимися</td>
                <td rowspan="2">Самостоятельная работа</td>
            </tr>
            <tr>
                <td>Лекции</td>
                <td>Семинарские (практические занятия)</td>
                <td>Консультации</td>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody1 = table1.querySelector('tbody');
    //first table fields
    data.semesters.forEach((semester, semesterIndex) => {
        tbody1.append(createTableRow([
            '',
            {text: 'Семестр', bold: true},
            {text: semesterIndex + 1, bold: true},
            {text: semester.lecturesHour || '', bold: true},
            {text: semester.seminarsHour || '', bold: true},
            {text: semester.consultationsHour || '', bold: true},
            {text: semester.independentWorkHour || '', bold: true},
            ''
        ]));

        semester.topics.forEach((topic, topicIndex) => {
            tbody1.append(createTableRow([
                {text: topicIndex + 1, bold: true},
                {text: topic.topicName, bold: true},
                semesterIndex + 1,
                {text: topic.lecturesHour || '', bold: true},
                {text: topic.seminarsHour || '', bold: true},
                {text: topic.consultationsHour || '', bold: true},
                {text: topic.independentWorkHour || '', bold: true},
                ''
            ]));

            topic.subtopics.forEach((subtopic, subtopicIndex) => {
                tbody1.append(createTableRow([
                    `${topicIndex+1}.${subtopicIndex+1}`,
                    subtopic.subtopicName,
                    semesterIndex + 1,
                    subtopic.lectureHour || '',
                    subtopic.seminarsHour || '',
                    subtopic.consultationsHour || '',
                    subtopic.independentWorkHour || '',
                    subtopic.formsOfMonitoringProgress || ''
                ]));
            });
        });
    });
    // first table footer
    table1.innerHTML += `
        <tfoot>
            <tr>
                <td colspan="2" style="font-weight: bold;">Итого часов</td>
                <td style="font-weight: bold;"></td>
                <td style="font-weight: bold;">${data.semesters.reduce((accum, item) => accum + +(item.lecturesHour ? item.lecturesHour : '0'), 0)}</td>
                <td style="font-weight: bold;">${data.semesters.reduce((accum, item) => accum + +(item.lecturesHour ? item.seminarsHour : '0'), 0)}</td>
                <td style="font-weight: bold;">${data.semesters.reduce((accum, item) => accum + +(item.lecturesHour ? item.consultationsHour : '0'), 0)}</td>
                <td style="font-weight: bold;">${data.semesters.reduce((accum, item) => accum + +(item.lecturesHour ? item.independentWorkHour : '0'), 0)}</td>
                <td style="font-weight: bold;">${data.examHours}</td>
            </tr>
        </tfoot>
    `;
    inter.append(table1);

    inter.append(createElement({
        tagName: 'h2',
        textContent: '4.3 Содержание учебного материала',
        styles: {
            fontSize: '12pt',
            fontWeight: 'bold'
        }
    }));
    let table3 = document.createElement('table');
    let allTopicsNames = '';
    data.semesters.forEach(semester => {
        semester.topics.forEach((topic, topicIndex) => {
            allTopicsNames += `${topic.topicName}${(topicIndex === semester.topics.length - 1) ? '' : ', '}`;
        });
    });
    let allformsOfMonitoringProgress = '';
    data.semesters.forEach(semester => {
        semester.topics.forEach((topic) => {
            topic.subtopics.forEach((subtopic, subtopicIndex) => {
                allformsOfMonitoringProgress += `${subtopic.formsOfMonitoringProgress}${(subtopicIndex === topic.subtopics.length - 1) ? '' : ', '}`;
            });
        });
    });
    table3.innerHTML += `
        <tbody>
            <tr>
                <td width="30%">Трудоемкость дисциплины (з.е.)</td>
                <td>${data.laborIntensity || ''}</td>
            </tr>
            <tr>
                <td>Наименование основных разделов (модулей)</td>
                <td>${allTopicsNames || ''}</td>
            </tr>
            <tr>
                <td>Формы текущего контроля</td>
                <td>${allformsOfMonitoringProgress || ''}</td>
            </tr>
            <tr>
                <td>ФФорма промежуточной аттестации</td>
                <td>${data.finalExamination || ''}</td>
            </tr>
        </tbody>
    `;
    inter.append(table3);


    container.append(inter);
}

function createTableRow(cellList){
    const row = document.createElement('tr');
    for(const cell of cellList){
        if(cell instanceof Object){
            row.append(createElement({tagName: 'td', textContent: cell.text, styles: {fontWeight: 'bold'}}));
        }else{
            row.append(createElement({tagName: 'td', textContent: cell}));
        }
    }
    return row;
}