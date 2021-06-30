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
		let sem_line = document.createElement('tr');

        sem_line.append(
            createElement({tagName: 'td', textContent: 'Семестр'}),
            createElement({tagName: 'td', textContent: i+1}),
            createElement({tagName: 'td', textContent: data.semesters[i].lecturesHour || ''}),
            createElement({tagName: 'td', textContent: data.semesters[i].seminarsHour || ''}),
            createElement({tagName: 'td', textContent: data.semesters[i].consultationsHour || ''}),
            createElement({tagName: 'td', textContent: data.semesters[i].independentWorkHours || ''}),
        );

        table.append(sem_line);
		
		for (let j = 0; j < data.semesters[i].topics.length; j++){
			let sem_top_line = document.createElement('tr');

            sem_top_line.append(
                createElement({tagName: 'td', textContent: data.semesters[i].topics[j].topicName}),
                createElement({tagName: 'td', textContent: i+1}),
                createElement({tagName: 'td', textContent: data.semesters[i].topics[j].lecturesHour || ''}),
                createElement({tagName: 'td', textContent: data.semesters[i].topics[j].seminarsHour || ''}),
                createElement({tagName: 'td', textContent: data.semesters[i].topics[j].consultationsHour || ''}),
                createElement({tagName: 'td', textContent: data.semesters[i].topics[j].independentWorkHours || ''}),
            );
			
			table.append(sem_top_line);

			for (let k = 0; k < data.semesters[i].topics[j].subtopics.length; k++){
				let sem_sub_line = document.createElement('td');

                sem_sub_line.append(
                    createElement({tagName: 'td', textContent: data.semesters[i].topics[j].subtopics[k].subtopicName}),
                    createElement({tagName: 'td', textContent: i+1}),
                    createElement({tagName: 'td', textContent: data.semesters[i].topics[j].subtopics[k].lectureHour || ''}),
                    createElement({tagName: 'td', textContent: data.semesters[i].topics[j].subtopics[k].seminarsHour || ''}),
                    createElement({tagName: 'td', textContent: data.semesters[i].topics[j].subtopics[k].consultationsHour || ''}),
                    createElement({tagName: 'td', textContent: data.semesters[i].topics[j].subtopics[k].independentWorkHours || ''}),
                    createElement({tagName: 'td', textContent: data.semesters[i].topics[j].subtopics[k].formsOfMonitoringProgress || ''}),
                );
				
				table.append(sem_sub_line);
			}
		}
	}

	inter.append(table);

    container.append(inter);
}

function createElement({tagName, className, textContent, attributes, styles}){
    const element = document.createElement(tagName);
    if(textContent) {
        element.textContent = textContent;
    }
    if(className){
        if(Array.isArray(className)){
            element.classList.add(...className);
        }else{
            element.classList.add(className);
        }
    }
    if(attributes){
        for(const [key, value] of Object.entries(attributes)){
            element.setAttribute(key, value);
        }
    }
    if(styles){
        Object.assign(element.style, styles);
    }
    return element;
}