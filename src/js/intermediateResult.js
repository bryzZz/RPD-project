export default function intermediateResult(container, data){
    container.innerHTML = '';
    let result = document.createElement('table');
	result.border = '2px';
		
	for (let i = 0; i < data.semesters.length; i++){
		let sem_line = document.createElement('tr');
		
		let word = document.createElement('td');
		word.textContent = 'Семестр';
		sem_line.append(word);
		
		let sem_num = document.createElement('td');
		sem_num.textContent = `${i+1}`;
		sem_line.append(sem_num);
		
		let sem_lec = document.createElement('td');
		sem_lec.textContent = `${data.semesters[i].lecturesHour}`;
		sem_line.append(sem_lec);
		
		let sem_sem = document.createElement('td');
		sem_sem.textContent = `${data.semesters[i].seminarsHour}`;
		sem_line.append(sem_sem);
		
		let sem_con = document.createElement('td');
		sem_con.textContent = `${data.semesters[i].consultationsHour ? data.semesters[i].consultationsHour : ''}`;
		sem_line.append(sem_con);
		
		let sem_ind = document.createElement('td');
		sem_ind.textContent = `${data.semesters[i].independentWorkHours}`;
		sem_line.append(sem_ind);
		
		result.append(sem_line);
		
		for (let j = 0; j < data.semesters[i].topics.length; j++){
			let sem_top_line = document.createElement('tr');
			
			let top_name = document.createElement('td');
			top_name.textContent =  `${data.semesters[i].topics[j].topicName}`;
			sem_top_line.append(top_name);
			
			let top_sem_num = document.createElement('td');
			top_sem_num.textContent =  `${i+1}`;
			sem_top_line.append(top_sem_num);
			
			let top_lec = document.createElement('td');
			top_lec.textContent =  `${data.semesters[i].topics[j].lecturesHour}`;
			sem_top_line.append(top_lec);
			
			let top_sem = document.createElement('td');
			top_sem.textContent =  `${data.semesters[i].topics[j].seminarsHour}`;
			sem_top_line.append(top_sem);
			
			let top_con = document.createElement('td');
			top_con.textContent =  `${data.semesters[i].topics[j].consultationsHour}`;
			sem_top_line.append(top_con);
			
			let top_ind = document.createElement('td');
			top_ind.textContent =  `${data.semesters[i].topics[j].independentWorkHours}`;
			sem_top_line.append(top_ind);
			
			result.append(sem_top_line);
			for (let k = 0; k < data.semesters[i].topics[j].subtopics.length; k++){
				let sem_sub_line = document.createElement('td');
				
				let sub_name = document.createElement('td');
				sub_name.textContent = `${data.semesters[i].topics[j].subtopics[k].subtopicName}`;
				sem_sub_line.append(sub_name);
				
				let sub_num = document.createElement('td');
				sub_num.textContent = `${i+1}`;
				sem_sub_line.append(sub_num);
				
				let sub_lec = document.createElement('td');
				sub_lec.textContent = `${data.semesters[i].topics[j].subtopics[k].lectureHour}`;
				sem_sub_line.append(sub_lec);
				
				let sub_sem = document.createElement('td');
				sub_sem.textContent = `${data.semesters[i].topics[j].subtopics[k].seminarsHour}`;
				sem_sub_line.append(sub_sem);
				
				let sub_con = document.createElement('td');
				sub_con.textContent = `${data.semesters[i].topics[j].subtopics[k].consultationsHour}`;
				sem_sub_line.append(sub_con);
				
				let sub_ind = document.createElement('td');
				sub_ind.textContent = `${data.semesters[i].topics[j].subtopics[k].independentWorkHours}`;
				sem_sub_line.append(sub_ind);
				
				let sub_for = document.createElement('td');
				sub_for.textContent = `${data.semesters[i].topics[j].subtopics[k].formsOfMonitoringProgress}`;
				sem_sub_line.append(sub_for);
				
				result.append(sem_sub_line);
			}
		}
	}
	container.append(result);

}