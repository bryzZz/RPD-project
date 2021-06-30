import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell } from "docx";

export default function generateDocxFile(allData){
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
			new Table({
				rows: [
					new TableRow({
						children: [
							new TableCell({
								children: [],
							})
						]
					})
				]
			})
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