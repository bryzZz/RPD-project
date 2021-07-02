import { saveAs } from 'file-saver';
import {Document, Packer, Paragraph, TextRun, Header, AlignmentType, VerticalAlign, WidthType, Table, TableRow, TableCell, Indent} from "docx";

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
						after: 1,
						before: 1,
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
					children: [
						new TextRun({
							text: "Трудоёмкость дисциплины составляет " + `${allData.laborIntensity}` + " зачётных единиц, " + `${allData.numberOfHoursAll}` + " часов, " + `${allData.examHours}`  + " часов на экзамен.",
							font: "Times New Roman",
							size: 24,	
						}),
					],
				}),
				new Paragraph({
					children: [
						new TextRun({
							text: "Форма промежуточной аттестации: " + `${allData.finalExamination}`,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),				
				
				new Paragraph({
					spacing: {
						after: 20,
						before: 20,
					},
					alignment: AlignmentType.LEFT,
					children: [
						new TextRun({
							spacing: {
								after: 2,
								before: 2,
							},
							text: "4.1 Содержание дисциплины, структуризированное по темам, с указанием видов учебных занятий и отведенного на них количества академических часов",
							bold: true,
							font: "Times New Roman",
							size: 24,
						}),
					]
				}),
				table1,
				
				new Paragraph(""),
				new Paragraph({
					spacing: {
						after: 2,
						before: 2,
					},
					alignment: AlignmentType.CENTER,
					children: [
						new TextRun({
							spacing: {
								after: 20,
								before: 20,
							},
							text: "4.4 Методические указания по организации самостоятельной работы студентов",
							bold: true,
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
