import Excel from 'exceljs';
import stringify from 'csv-stringify/lib/sync.js';
import fs from 'fs';

const priAreaNo = 9;

const files = {
  '2018': '',
  '2019': 'totals2019.xlsx',
  '2020': 'totals2020.xlsx',
}

let data = [];

for (let year in files) {
  let file = files[year];
  if (!file) continue;
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(file);
  const worksheet = workbook.getWorksheet('Стойности');

  worksheet.eachRow((row, rowNumber) => {
    let first = row.getCell(1).value;
    let title = first?.match(/^(\d+) (.*)/);
    if (title) {
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+(i+2)*3).value;
        if (nat === 0 && eu === 0) continue;
        data.push({
          'Приоритетна област': worksheet.getCell(1,2 + i*3).value.match(/\d+: (.*)/)[1],
          'Дейност': `Дейност ${title[1]} "${title[2]}"`,
          'Година': year,
          'Средства в лв. от националния бюджет (без национални програми)': nat,
          'Средства от ЕС и други международни проекти и програми в лв.': eu,
        });
        //console.log(data[data.length-1])
      }
    }
    //console.log('Row ' + rowNumber + ' = ' + JSON.stringify(first));
  });
}

fs.writeFileSync('data-per-activity-true.csv','\ufeff' + stringify(data,{
  header: true
}), 'utf-8');
