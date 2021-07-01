import { saveAs } from 'file-saver';
import {Document, Packer, Paragraph, TextRun, Header, AlignmentType, VerticalAlign, WidthType, Table, TableRow, TableCell} from "docx";

export default function generateDocxFile(allData){
	
	const tableRows = [];
	for (let i = 0; i < allData.semesters.length; i++){/*доделывается цикл*/
		tableRows.push(new TableRow({
			children: [
				new TableCell({
					children: [],
				}),
				new TableCell({
					children: [
						new Paragraph("Семестр"),
					]
				}),
				new TableCell({
					children: [
						new Paragraph(`${i+1}`),
					]
				}),
				new TableCell({
					children: [
						new Paragraph(`${allData.semesters[i].lecturesHour}`)
					]
				}),
				new TableCell({
					children: [
						new Paragraph(`${allData.semesters[i].seminarsHour}`)
					]
				}),
				new TableCell({
					children: [
						new Paragraph(`${allData.semesters[i].consultationsHour}`)
					]
				}),
				new TableCell({
					children: [
						new Paragraph(`${allData.semesters[i].independentWorkHour}`)
					]
				}),
				new TableCell({
					children: []
				}),
			]
		}));
		for (let j = 0; j < allData.semesters[i].topics.length; j++){
			tableRows.push(new TableRow({
				children: [
					new TableCell({
						children: [
							new Paragraph(`${j+1}`)
						],
					}),
					new TableCell({
						children: [
							new Paragraph(`${allData.semesters[i].topics[j].topicName}`),
						]
					}),
					new TableCell({
						children: [
							new Paragraph(`${i+1}`),
						]
					}),
					new TableCell({
						children: [
							new Paragraph(`${allData.semesters[i].topics[j].lecturesHour}`)
						]
					}),
					new TableCell({
						children: [
							new Paragraph(`${allData.semesters[i].topics[j].seminarsHour}`)
						]
					}),
					new TableCell({
						children: [
							new Paragraph(`${allData.semesters[i].topics[j].consultationsHour}`)
						]
					}),
					new TableCell({
						children: [
							new Paragraph(`${allData.semesters[i].topics[j].independentWorkHour}`)
						]
					}),
					new TableCell({
						children: []
					}),
				]
			})); 
			for (let k = 0; k < allData.semesters[i].topics[j].subtopics.length; k++){
				tableRows.push(new TableRow({
					children: [
						new TableCell({
							children: [
								new Paragraph(`${j+1}` + "." + `${k+1}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${allData.semesters[i].topics[j].subtopics[k].subtopicName}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${i+1}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${allData.semesters[i].topics[j].subtopics[k].lecturesHour}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${allData.semesters[i].topics[j].subtopics[k].seminarsHour}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${allData.semesters[i].topics[j].subtopics[k].consultationsHour}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${allData.semesters[i].topics[j].subtopics[k].independentWorkHour}`),
							],
						}),
						new TableCell({
							children: [
								new Paragraph(`${allData.semesters[i].topics[j].subtopics[k].formsOfMonitoringProgress}`),
							]
					}),
				]
				}));
			}
		}
	}
	let table = new Table({
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
			...tableRows,
		]
	})
          
   const doc = new Document({
        sections: [{
			
            properties: {},
            children: [		
			new Paragraph({
				spacing: {
					after: 1,
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
                ]
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
					after: 2,
					before: 2,
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
			table,
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

