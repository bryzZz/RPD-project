import { saveAs } from 'file-saver';
import {Document, Packer, Paragraph, TextRun, Header, AlignmentType, VerticalAlign, WidthType, Table, TableRow, TableCell} from "docx";

export default function generateDocxFile(allData){
	
	const table1Rows = [];
	let gen_lec = 0,
		gen_sem = 0,
		gen_con = 0,
		gen_ind = 0;
		
	for (let i = 0; i < allData.semesters.length; i++){//Генерация полей первой таблицы
		table1Rows.push(new TableRow({ //Семетры
			children: [
				new TableCell({
					children: [],
				}),
				new TableCell({
					children: [
						new Paragraph({
							children:[
								new TextRun({text: "Семестр", bold: true, font: "Times New Roman", size: 24}),
							],
						}),
					]
				}),
				new TableCell({
					children: [
						new Paragraph({
							children: [
								new TextRun({text: `${i+1}`, bold: true, font: "Times New Roman", size: 24}),
							],
						}),
					]
				}),
				new TableCell({
					children: [
						new Paragraph({
							children: [
								new TextRun({text: `${allData.semesters[i].lecturesHour}`, bold: true, font: "Times New Roman", size: 24}),
							],
						}),
					]
				}),
				new TableCell({
					children: [
						new Paragraph({
							children: [
								new TextRun({text: `${allData.semesters[i].seminarsHour}`, bold: true, font: "Times New Roman", size: 24}), 
							],
						}),
					]
				}),
				new TableCell({
					children: [
						new Paragraph({
							children:[
								new TextRun({text: `${allData.semesters[i].consultationsHour}`, bold: true, font: "Times New Roman", size: 24}),
							],
						}),
					]
				}),
				new TableCell({
					children: [
						new Paragraph({
							children: [
								new TextRun({text: `${allData.semesters[i].independentWorkHour}`, bold: true, font: "Times New Roman", size: 24}),
							],
						}),
					]
				}),
				new TableCell({
					children: []
				}),
			]
		}));
		gen_lec += +allData.semesters[i].lecturesHour; console.log(gen_lec);
		gen_sem += +allData.semesters[i].seminarsHour; console.log(gen_sem);
		gen_con += +allData.semesters[i].consultationsHour; console.log(gen_con);
		gen_ind += +allData.semesters[i].independentWorkHour; console.log(gen_ind);
		for (let j = 0; j < allData.semesters[i].topics.length; j++){
			table1Rows.push(new TableRow({ //Разделы
				children: [
					new TableCell({
						children: [
							new Paragraph({
								alignment: AlignmentType.CENTER,
								children: [
									new TextRun({text: `${j+1}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),
						],
					}),
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({text: `${allData.semesters[i].topics[j].topicName}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),	
						],
					}),
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({text: `${i+1}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),
						]
					}),
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({text: `${allData.semesters[i].topics[j].lecturesHour}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),
						],
					}),
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({text: `${allData.semesters[i].topics[j].seminarsHour}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),
						],
					}),
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({text: `${allData.semesters[i].topics[j].consultationsHour}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),
						],
					}),
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({text: `${allData.semesters[i].topics[j].independentWorkHour}`, bold: true, font: "Times New Roman", size: 24}),
								],
							}),
						],
					}),
					new TableCell({
						children: []
					}),
				]
			})); 
			for (let k = 0; k < allData.semesters[i].topics[j].subtopics.length; k++){
				table1Rows.push(new TableRow({ //Темы
					children: [
						new TableCell({
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [
										new TextRun({text: `${j+1}` + "." + `${k+1}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${allData.semesters[i].topics[j].subtopics[k].subtopicName}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${i+1}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${allData.semesters[i].topics[j].subtopics[k].lecturesHour}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${allData.semesters[i].topics[j].subtopics[k].seminarsHour}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${allData.semesters[i].topics[j].subtopics[k].consultationsHour}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${allData.semesters[i].topics[j].subtopics[k].independentWorkHour}`, font: "Times New Roman", size: 24}),
									],
								}),
							],
						}),
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({text: `${allData.semesters[i].topics[j].subtopics[k].formsOfMonitoringProgress}`, font: "Times New Roman", size: 24}),
									],
								}),
							]
					}),
				]
				}));
			}
		}
	}
	table1Rows.push(new TableRow({/*Строка "Итого"*/
		children:[
			new TableCell({
				columnSpan: 2,
				children: [
					new Paragraph ({
						children: [
							new TextRun({text: "Итого часов:", bold: true, font: "Times New Roman", size: 24}),
						],
					}),
							
				],
			}),
			new TableCell({
				children: [],
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({text: `${gen_lec}`, font: "Times New Roman", size: 24}),
						],
					}),
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({text: `${gen_sem}`, font: "Times New Roman", size: 24}),
						],
					}),
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({text: `${gen_con}`, font: "Times New Roman", size: 24}),
						]
					}),
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({text:`${gen_ind}`, size: 24, font: "Times New Roman"}),
						],
					}),
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({text: `${allData.examHours}`, font: "Times New Roman", size: 24}),
						],
					}),
				],
			}),
		]
	}))
	let table1 = new Table({ //Таблица 4.1
		width: {
			size: 90,
			type: WidthType.PERCENTAGE,
		},
		indent: {
			size: 10,
			type: WidthType.PERCENTAGE,
		},
		rows: [
			new TableRow({
				children: [
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({text: "п/п", alignment: AlignmentType.CENTER,})],
						rowSpan: 3,
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({text: "Раздел дисциплины/темы", alignment: AlignmentType.CENTER,})],
						rowSpan: 3,
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({
							text: "Семестр", 
							alignment: AlignmentType.CENTER,})],
						rowSpan: 3,
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({
							text: "Виды учебной работы, включая самостоятельную работу обучающихся и трудоемкость (в часах)", 
							alignment: AlignmentType.CENTER,
						})],
						columnSpan: 4,
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({
							alignment: AlignmentType.CENTER,
							children:[
								new TextRun({
									text: "Формы текущего контроля успеваемости; Форма промежуточной аттестации ", 
								}), 
								new TextRun({
									italics: true, 
									text: "(по семестрам)", 
								})
							],					
						})],
						rowSpan: 3,
					}),
				],
			}),		
			new TableRow({
				children: [
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						columnSpan: 3,
						children: [new Paragraph({text: "Контактная работа преподавателя с обучающимися", alignment: AlignmentType.CENTER,})],
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						rowSpan: 2,
						children: [new Paragraph({text: "Самостоятельная работа", alignment: AlignmentType.CENTER,})],
					}),
				],
			}),			
			new TableRow({
				children: [
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({text: "Лекции", alignment: AlignmentType.CENTER,})],
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({text: "Семинарские (практические занятия)", alignment: AlignmentType.CENTER,})],
					}),
					new TableCell({verticalAlign: VerticalAlign.CENTER,
						children: [new Paragraph({text: "Консультации", alignment: AlignmentType.CENTER,})],
					}),
				]
			}),
			...table1Rows,
		],
	})
	  
   const doc = new Document({
        sections: [{
			
            properties: {},
            children: [		
				new Paragraph({
					spacing: {
						after: 120,
						before: 120,
					},
					alignment: AlignmentType.CENTER,
					children: [
						new TextRun({
							text: "IV. СОДЕРЖАНИЕ И СТРУКТУРА ДИСЦИПЛИНЫ",
							bold: true,
							font: "Times",
							size: 28,
						}),
					],
				}),
				new Paragraph({
					indent: {
						firstLine: 625,
					},
					children: [
						new TextRun({
							text: "Трудоёмкость дисциплины составляет " + `${allData.laborIntensity}` + " зачётных единиц, " + `${allData.numberOfHoursAll}` + " часов, " + `${allData.examHours}`  + " часов на экзамен.",
							font: "Times New Roman",
							size: 24,	
						}),
					],
				}),
				new Paragraph({
					indent: {
						firstLine: 625,
					},
					children: [
						new TextRun({
							text: "Форма промежуточной аттестации: " + `${allData.finalExamination}`,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),				
				
				new Paragraph({//Заголовок 4.1
					spacing: {
						after: 120,
						before: 120,
					},
					indent: {
						firstLine: 625,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "4.1 Содержание дисциплины, структуризированное по темам, с указанием видов учебных занятий и отведенного на них количества академических часов",
							bold: true,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				table1,
				
				new Paragraph(""),
				new Paragraph({//Заголовок 4.4
					spacing: {
						after: 120,
						before: 120,
					},
					indent: {
						firstLine: 625,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "4.4 Методические указания по организации самостоятельной работы студентов",
							bold: true,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				
				new Paragraph({//Самостоятельная работа студентов...
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "Самостоятельная работа студентов всех форм и видов обучения является одним из обязательных видов образовательной деятельности, обеспечивающей реализацию требований Федеральных государственных стандартов высшего профессионального образования. Согласно требованиям нормативных документов самостоятельная работа студентов является обязательным компонентом образовательного процесса, так как она обеспечивает закрепление получаемых на лекционных занятиях знаний путем приобретения навыков осмысления и расширения их содержания, навыков решения актуальных проблем формирования общекультурных и профессиональных компетенций, научно-исследовательской деятельности, подготовки к семинарам, лабораторным работам, сдаче зачетов и экзаменов. Самостоятельная работа студентов представляет собой совокупность аудиторных и внеаудиторных занятий и работ. Самостоятельная работа в рамках образовательного процесса в вузе решает следующие задачи:",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//-закрепление и расширение знаний...
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "— закрепление и расширение знаний, умений, полученных студентами во время аудиторных и внеаудиторных занятий, превращение их в стереотипы умственной и физической деятельности; ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//-приобретение дополнительных знаний...
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "— приобретение дополнительных знаний и навыков по дисциплинам учебного плана;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//-развитие ориентации...
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "— развитие ориентации и установки на качественное освоение образовательной программы;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//-развитие навыков самоорганизации
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "— развитие навыков самоорганизации; ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//-формирование самостоятельности мышления...
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "— формирование самостоятельности мышления, способности к саморазвитию, самосовершенствованию и самореализации;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//-выработка навыков эффективной...
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "— выработка навыков эффективной самостоятельной профессиональной теоретической, практической и учебно-исследовательской деятельности.",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Подготовка к лекции
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Подготовка к лекции. ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Качество освоения содержания конкретной дисциплины прямо зависит от того, насколько студент сам, без внешнего принуждения формирует у себя установку на получение на лекциях новых знаний, дополняющих уже имеющиеся по данной дисциплине. Время на подготовку студентов к двухчасовой лекции по нормативам  составляет не менее 0,2 часа. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Подготовка к практическому занятию
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Подготовка к практическому занятию. ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Подготовка к практическому занятию включает следующие элементы самостоятельной деятельности: четкое представление цели и задач его проведения; выделение навыков умственной, аналитической, научной деятельности, которые станут результатом предстоящей работы. Выработка навыков осуществляется с помощью получения новой информации об изучаемых процессах и с помощью знания о том, в какой степени в данное время студент владеет методами исследовательской деятельности, которыми он станет пользоваться на практическом занятии. Подготовка к практическому занятию нередко требует подбора материала, данных и специальных источников, с которыми предстоит учебная работа. Студенты должны дома подготовить к занятию 3–4 примера формулировки темы исследования, представленного в монографиях, научных статьях, отчетах. Затем они самостоятельно осуществляют поиск соответствующих источников, определяют актуальность конкретного исследования  процессов и явлений, выделяют основные способы доказательства авторами научных работ ценности того, чем они занимаются. В ходе самого практического занятия студенты сначала представляют найденные ими варианты формулировки актуальности исследования, обсуждают их и обосновывают свое мнение о наилучшем варианте. Время на подготовку к практическому занятию по нормативам  составляет не менее 0,2 часа.",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Подготовка к контрольной работе
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Подготовка к контрольной работе. ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Контрольная работа назначается после изучения определенного раздела (разделов) дисциплины и представляет собой совокупность развернутых письменных ответов студентов на вопросы, которые они заранее получают от преподавателя. Самостоятельная подготовка к контрольной работе включает в себя: — изучение конспектов лекций, раскрывающих материал, знание которого проверяется контрольной работой; повторение учебного материала, полученного при подготовке к семинарским, практическим занятиям и во время их проведения;  изучение дополнительной литературы, в которой конкретизируется содержание проверяемых знаний;  составление в мысленной форме ответов на поставленные в контрольной работе вопросы;  формирование психологической установки на успешное выполнение всех заданий. Время на подготовку к контрольной работе по нормативам  составляет 2 часа.  ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Подготовка к экзамену
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Подготовка к экзамену. ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Самостоятельная подготовка к экзамену схожа с подготовкой к зачету, особенно если он дифференцированный. Но объем учебного материала, который нужно восстановить в памяти к экзамену, вновь осмыслить и понять, значительно больше, поэтому требуется больше времени и умственных усилий. Важно сформировать целостное представление о содержании ответа на каждый вопрос, что предполагает знание разных научных трактовок сущности того или иного явления, процесса, умение раскрывать факторы, определяющие их противоречивость, знание имен ученых, изучавших обсуждаемую проблему. Необходимо также привести информацию о материалах эмпирических исследований, что указывает на всестороннюю подготовку студента к экзамену. Время на подготовку к экзамену по нормативам  составляет 36 часов для бакалавров.",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Формы внеаудиторной самостоятельной работы
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Формы внеаудиторной самостоятельной работы",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Составление глоссария
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Составление глоссария ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Цель самостоятельной работы: повысить уровень информационный культуры; приобрести новые знания; отработать необходимые навыки в предметной области учебного курса. Глоссарий — словарь специализированных терминов и их определений. Статья глоссария — определение термина. Содержание задания: сбор и систематизация понятий или терминов, объединенных общей специфической тематикой, по одному либо нескольким источникам. Выполнение задания: 1) внимательно прочитать работу; 2) определить наиболее часто встречающиеся термины; 3) составить список терминов, объединенных общей тематикой; 4) расположить термины в алфавитном порядке; 5) составить статьи глоссария: — дать точную формулировку термина в именительном падеже; — объемно раскрыть смысл данного термина Планируемые результаты самостоятельной работы: способность студентов решать стандартные задачи профессиональной деятельности на основе информационной и библиографической культуры с применением информационно-коммуникационных  технологий и с учетом основных требований информационной безопасности. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Разработка проекта
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Разработка проекта ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "(индивидуального, группового) Цель самостоятельной работы: развитие способности прогнозировать, проектировать, моделировать. Проект — «ограниченное во времени целенаправленное изменение отдельной системы с установленными требованиями к качеству результатов, возможными рамками расхода средств и ресурсов и специфической организацией». Выполнение задания: 1) диагностика ситуации (проблематизация, целеполагание, конкретизация цели, форматирование проекта); 2) проектирование (уточнение цели, функций, задач и плана работы; теоретическое моделирование методов и средств решения задач; детальная проработка этапов решения конкретных задач; пошаговое выполнение запланированных проектных действий; систематизация и обобщение полученных результатов, конструирование предполагаемого результата, пошаговое выполнение проектных действий); 3) рефлексия (выяснение соответствия полученного результата замыслу; определение качества полученного продукта; перспективы его развития и использования). Предполагаемые результаты самостоятельной работы:  готовность студентов использовать знание современных проблем науки и образования при решении образовательных и профессиональных задач;  готовность использовать индивидуальные креативные способности для оригинального решения исследовательских задач; — способность прогнозировать, проектировать, моделировать. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Информационный поиск
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Информационный поиск ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Цель самостоятельной работы: развитие способности к проектированию и преобразованию учебных действий на основе различных видов информационного поиска. Информационный поиск — поиск неструктурированной документальной информации. Список современных задач информационного поиска:  решение вопросов моделирования;  классификация документов;  фильтрация, классификация документов;  проектирование архитектур поисковых систем и пользовательских интерфейсов;  извлечение информации (аннотирование и реферирование документов);  выбор информационно-поискового языка запроса в поисковых системах. Содержание задания по видам поиска:  поиск библиографический — поиск необходимых сведений об источнике и установление его наличия в системе других источников. Ведется путем разыскания библиографической информации и библиографических пособий (информационных изданий);  поиск самих информационных источников (документов и изданий), в которых есть или может содержаться нужная информация; — поиск фактических сведений, содержащихся в литературе, книге (например, об исторических фактах и событиях,  о биографических данных из жизни и деятельности писателя, ученого и т. п.). Выполнение задания:",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//1)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "1) определение области знаний;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//2)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "2) выбор типа и источников данных;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//3)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "3) сбор материалов, необходимых для наполнения информационной модели;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//4)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "4) отбор наиболее полезной информации;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//5)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "5) выбор метода обработки информации (классификация, кластеризация, регрессионный анализ и т.д.);",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//6)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "6) выбор алгоритма поиска закономерностей;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//7)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "7) поиск закономерностей, формальных правил и структурных связей в собранной информации;",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//8)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "8) творческая интерпретация полученных результатов.",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Планируемые результаты самостоятельной работы
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "Планируемые результаты самостоятельной работы: — способность студентов решать стандартные задачи профессиональной деятельности на основе информационной и библиографической культуры с применением информационно-коммуникационных технологий и с учетом основных требований информационной безопасности;  готовность использовать знание современных проблем науки и образования при решении образовательных и профессиональных задач. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Разработка мультимедийной презентации
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							bold: true,
							text: "Разработка мультимедийной презентации ",
							font: "Times New Roman",
							size: 24,
						}),
						new TextRun({
							text: "Цели самостоятельной работы (варианты): — освоение (закрепление, обобщение, систематизация) учебного материала; — обеспечение контроля качества знаний; — формирование специальных компетенций, обеспечивающих возможность работы с информационными технологиями; — становление общекультурных компетенций. Мультимедийная презентация — представление содержания учебного материала, учебной задачи с использованием мультимедийных технологий. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Выполнение задания:
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "Выполнение задания:",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//1)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "1. Этап проектирования: — определение целей использования презентации; — сбор необходимого материала (тексты, рисунки, схемы и др.); — формирование структуры и логики подачи материала; — создание папки, в которую помещен собранный материал. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//2)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "2. Этап конструирования: — выбор программы MS PowerPoint в меню компьютера; — определение дизайна слайдов; — наполнение слайдов собранной текстовой и наглядной информацией; — включение эффектов анимации и музыкального сопровождения (при необходимости); — установка режима показа слайдов (титульный слайд, включающий наименование кафедры, где выполнена работа, название презентации, город и год; содержательный — список слайдов презентации, сгруппированных по темам сообщения; заключительный слайд содержит выводы, пожелания, список литературы и пр.). ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//3)
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "3. Этап моделирования — проверка и коррекция подготовленного материала, определение продолжительности его демонстрации.",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//Планируемые результаты самостоятельной работы
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "Планируемые результаты самостоятельной работы: — повышение информационной культуры студентов и обеспечение их готовности к интеграции в современное информационное пространство; — способность решать стандартные задачи профессиональной деятельности на основе информационной и библиографической культуры с применением информационно-коммуникационных технологий и с учетом основных требований информационной безопасности; — способность к критическому восприятию, обобщению, анализу профессиональной информации, постановке цели и выбору путей ее достижения; — способность применять современные методики и технологии организации и реализации образовательного процесса на различных  образовательных ступенях в различных образовательных учреждениях; — готовность использовать индивидуальные креативные способности для оригинального решения исследовательских задач. ",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//В ФБГОУ ВО «ИГУ»
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "В ФБГОУ ВО «ИГУ» организация самостоятельной работы студентов регламентируется Положением о самостоятельной работе студентов, принятым Ученым советом ИГУ 22 июня 2012 г.",
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
			
				new Paragraph({//Заголовок 4.5
					spacing: {
						after: 120,
						before: 120,
					},
					indent: {
						firstLine: 625,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: "4.5 Примерная тематика курсовых работ (проектов)",
							bold: true,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				new Paragraph({//В ФБГОУ ВО «ИГУ»
					indent: {
						firstLine: 625,
					},
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							text: `${allData.approximateTopicsOfTermPapers}`,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
			]
        }]
    });
 

    console.log(doc);
    
    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}
