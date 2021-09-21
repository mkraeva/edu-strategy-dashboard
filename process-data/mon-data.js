import Excel from 'exceljs';
import stringify from 'csv-stringify/lib/sync.js';
import fs from 'fs';
import _ from 'lodash';

const priAreaNo = 9;

const files = {
  '2018': 'totals2018.xlsx',
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
    let titleActivity = firstCell?.match(/^(\d+)\s+(.*)/);
    let titleTotal = firstCell === 'ОБЩО';
    if (titleActivity) {
      lastActivity = `Дейност ${titleActivity[1]} "${titleActivity[2]}"`;
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+i*3+2).value;
        if (!nat && !eu) continue;
        dataPerActivity.push({
          'Приоритетна област': worksheet.getCell(1,2 + i*3).value.match(/\d+: (.*)/)[1],
          'Дейност': lastActivity,
          'Година': year,
          'Средства в лв. от националния бюджет (без национални програми)': nat || 0,
          'Средства от ЕС и други международни проекти и програми в лв.': eu || 0,
        });
        // console.log(dataPerActivity[dataPerActivity.length-1])
      }
    }
    else if (titleTotal) {
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+i*3+2).value;
        dataTotals.push({
          'Приоритетна област': worksheet.getCell(1,2 + i*3).value.match(/\d+: (.*)/)[1],
          'Година': Number.parseInt(year),
          'Средства в лв. от националния бюджет (без национални програми)': nat || 0,
          'Средства от ЕС и други международни проекти и програми в лв.': eu || 0,
        });
      }
    } else if (lastActivity && !firstCell.startsWith('Забележка')) {
      for (let i = 0; i < priAreaNo; i++) {
        let nat = row.getCell(2+i*3).value, eu = row.getCell(2+i*3+2).value;
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

let programsFile = 'programs.xlsx';
const workbook = new Excel.Workbook();
await workbook.xlsx.readFile(programsFile);
const worksheet = workbook.getWorksheet('Values');

let modules = [];

worksheet.eachRow((row, rowNumber) => {
  if (rowNumber === 1) return;
  modules.push({
    'Приоритетна област': row.getCell(1).value.match(/\d+: (.*)/)[1],
    'Програма': row.getCell(2).value?.replaceAll('\n',' ')?.replaceAll(/["“„”]/g,''),
    'Модул': row.getCell(3).value?.replaceAll('\n',' ')?.replaceAll(/["“„”]/g,'') || '',
    'Вид': row.getCell(4).value,
    'Средства': row.getCell(5).value.result || row.getCell(5).value,
    'Година': row.getCell(6).value,
  });
});

for (let row of dataTotals) {
  let priArea = row['Приоритетна област'], year = row['Година'];
  modules.push({
    'Приоритетна област': priArea,
    'Програма': 'Средства в лв. от националния бюджет (без национални програми)',
    'Модул': '',
    'Вид': 'Бюджет',
    'Средства': row['Средства в лв. от националния бюджет (без национални програми)'],
    'Година': year,
  });

  let externalNoOP =
   row['Средства от ЕС и други международни проекти и програми в лв.'];
   /* -
   _.sumBy(modules.filter(m => m['Година'] === year && m['Приоритетна област'] === priArea && m['Вид'] === 'Европейски програми и проекти')
    ,'Средства'); */

  if (externalNoOP < 0) externalNoOP = 0;

  modules.push({
    'Приоритетна област': priArea,
    'Програма': 'Средства от ЕС и други международни проекти',
    'Модул': '',
    'Вид': 'Външен източник',
    'Средства': externalNoOP,
    'Година': year,
  });
}

// fs.writeFileSync('data-per-activity.csv','\ufeff' + stringify(dataPerActivity,{
//   header: true,
//   delimiter: '\t',
// }), 'utf-8');

// fs.writeFileSync('data-totals.csv','\ufeff' + stringify(dataTotals,{
//   header: true,
//   delimiter: '\t',
// }), 'utf-8');

// fs.writeFileSync('data-expenditure.csv','\ufeff' + stringify(dataPerExpenditure,{
//   header: true,
//   delimiter: '\t',
// }), 'utf-8');

fs.writeFileSync('data-per-module.csv','\ufeff' + stringify(modules,{
  header: true,
  delimiter: '\t',
}), 'utf-8');