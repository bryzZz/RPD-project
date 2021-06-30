import {createElement} from './utils.js';

export default function intermediateResult(container, data){
    let inter = container.querySelector('.intermediateResultContainer') || createElement({tagName: 'div', className: 'intermediateResultContainer'});
    inter.innerHTML = '';

    // const lineBreak = '\n';

    inter.append(createElement({
        tagName: 'h1',
        textContent: 'IV. СОДЕРЖАНИЕ И СТРУКТУРА ДИСЦИПЛИНЫ\n\n',
        styles: {
            fontSize: '12pt',
            fontWeight: 'bold'
        }
    }));
    // container.append(lineBreak);
    inter.append(createElement({
        tagName: 'p',
        textContent: `Трудоемкость дисциплины составляет ${data.laborIntensity} зачетных единиц, ${data.numberOfHoursAll} часов, ${data.examHours} часов на экзамен.\n\n`,
    }));
    inter.append(createElement({
        tagName: 'p',
        textContent: `Форма промежуточной аттестации: ${data.finalExamination}\n`,
    }));

    inter.append(createElement({
        tagName: 'h2',
        textContent: '4.1 Содержание дисциплины, структурированное по темам, c указанием видов учебных занятий и отведенного на них количества академических часов',
        styles: {
            fontSize: '12pt',
            fontWeight: 'bold'
        }
    }));

    let table = document.createElement('table');
		
	for (let i = 0; i < data.semesters.length; i++){
        table.append(createRow([
            'Семестр',
            i+1,
            data.semesters[i].lecturesHour || '',
            data.semesters[i].seminarsHour || '',
            data.semesters[i].consultationsHour || '',
            data.semesters[i].independentWorkHours || ''
        ]));
		
		for (let j = 0; j < data.semesters[i].topics.length; j++){
            table.append(createRow([
                data.semesters[i].topics[j].topicName,
                i+1,
                data.semesters[i].topics[j].lecturesHour || '',
                data.semesters[i].topics[j].seminarsHour || '',
                data.semesters[i].topics[j].consultationsHour || '',
                data.semesters[i].topics[j].independentWorkHours || ''
            ]));

			for (let k = 0; k < data.semesters[i].topics[j].subtopics.length; k++){
                table.append(createRow([
                    data.semesters[i].topics[j].subtopics[k].subtopicName,
                    i+1,
                    data.semesters[i].topics[j].subtopics[k].lectureHour || '',
                    data.semesters[i].topics[j].subtopics[k].seminarsHour || '',
                    data.semesters[i].topics[j].subtopics[k].consultationsHour || '',
                    data.semesters[i].topics[j].subtopics[k].independentWorkHours || '',
                    data.semesters[i].topics[j].subtopics[k].formsOfMonitoringProgress || ''
                ]));
			}
		}
	}

	inter.append(table);

    container.append(inter);
}

function createRow(cellList){
    const row = document.createElement('tr');
    for(const cell of cellList){
        row.append(createElement({tagName: 'td', textContent: cell}));
    }
    return row;
}