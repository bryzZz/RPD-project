import {createElement} from './utils.js';

export default function intermediateResult(container, data){
    let inter = container.querySelector('.intermediateResultContainer') || createElement({tagName: 'div', className: 'intermediateResultContainer'});
    inter.innerHTML = '';

    //RPD IV header
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

    let table = document.createElement('table');
    
    table.innerHTML += `
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
    `;
    
    data.semesters.forEach((semester, semesterIndex) => {
        table.append(createTableRow([
            '',
            {text: 'Семестр', bold: true},
            {text: semesterIndex + 1, bold: true},
            {text: semester.lecturesHour || '', bold: true},
            {text: semester.seminarsHour || '', bold: true},
            {text: semester.consultationsHour || '', bold: true},
            {text: semester.independentWorkHour || '', bold: true},
            ''
        ]));

        semester.topics.forEach((topic) => {
            table.append(createTableRow([
                {text: semesterIndex, bold: true},
                {text: topic.topicName, bold: true},
                semesterIndex + 1,
                {text: topic.lecturesHour || '', bold: true},
                {text: topic.seminarsHour || '', bold: true},
                {text: topic.consultationsHour || '', bold: true},
                {text: topic.independentWorkHour || '', bold: true},
                ''
            ]));

            topic.subtopics.forEach((subtopic) => {
                table.append(createTableRow([
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

	inter.append(table);

    container.append(inter);
}

function createTableRow(cellList){
    const row = document.createElement('tr');
    for(const cell of cellList){
        if(cell?.bold){
            row.append(createElement({tagName: 'td', textContent: cell.text, styles: {fontWeight: 'bold'}}));
        }else{
            row.append(createElement({tagName: 'td', textContent: cell}));
        }
    }
    return row;
}