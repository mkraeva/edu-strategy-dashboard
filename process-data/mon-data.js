import Excel from 'exceljs';
import stringify from 'csv-stringify/lib/sync.js';
import fs from 'fs';

const priAreaNo = 9;

const files = {
  '2018': '',
  '2019': 'totals2019.xlsx',
  '2020': 'totals2020.xlsx',
}

let dataPerActivity = [], dataPerExpenditure = [], dataTotals = [];

for (let year in files) {
  let file = files[year];
  if (!file) continue;
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(file);
  const worksheet = workbook.getWorksheet('Стойности');

  let lastActivity = null;

  worksheet.eachRow((row, rowNumber) => {
    let firstCell = row.getCell(1).value;
    let titleActivity = firstCell?.match(/^(\d+) (.*)/);
    let titleTotal = firstCell === 'ОБЩО';
    if (titleActivity) {
      lastActivity = `Дейност ${titleActivity[1]} "${titleActivity[2]}"`;
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+(i+2)*3).value;
        if (!nat && !eu) continue;
        dataPerActivity.push({
          'Приоритетна област': worksheet.getCell(1,2 + i*3).value.match(/\d+: (.*)/)[1],
          'Дейност': lastActivity,
          'Година': year,
          'Средства в лв. от националния бюджет (без национални програми)': nat || 0,
          'Средства от ЕС и други международни проекти и програми в лв.': eu || 0,
        });
        //console.log(dataPerActivity[dataPerActivity.length-1])
      }
    }
    else if (titleTotal) {
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+(i+2)*3).value;
        dataTotals.push({
          'Приоритетна област': worksheet.getCell(1,2 + i*3).value.match(/\d+: (.*)/)[1],
          'Година': year,
          'Средства в лв. от националния бюджет (без национални програми)': nat || 0,
          'Средства от ЕС и други международни проекти и програми в лв.': eu || 0,
        });
      }
    } else if (lastActivity && !firstCell.startsWith('Забележка')) {
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+(i+2)*3).value;
        if (!nat && !eu) continue;
        dataPerExpenditure.push({
          'Приоритетна област': worksheet.getCell(1,2 + i*3).value.match(/\d+: (.*)/)[1],
          'Дейност': lastActivity,
          'Перо': firstCell,
          'Година': year,
          'Средства в лв. от националния бюджет (без национални програми)': nat || 0,
          'Средства от ЕС и други международни проекти и програми в лв.': eu || 0,
        });
      }
    }
  });
}

fs.writeFileSync('data-per-activity-true.csv','\ufeff' + stringify(dataPerActivity,{
  header: true,
  delimiter: '\t',
}), 'utf-8');

fs.writeFileSync('data-totals.csv','\ufeff' + stringify(dataTotals,{
  header: true,
  delimiter: '\t',
}), 'utf-8');

fs.writeFileSync('data-expenditure.csv','\ufeff' + stringify(dataPerExpenditure,{
  header: true,
  delimiter: '\t',
}), 'utf-8');