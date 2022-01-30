import Excel from 'exceljs';
import stringify from 'csv-stringify/lib/sync.js';
import fs from 'fs';
import _ from 'lodash';
import { Parser } from 'hot-formula-parser';

const priAreaNo = 9;
const parser = new Parser();

const files = {
  '2018': 'totals2018.xlsx',
  '2019': 'totals2019.xlsx',
  '2020': 'totals2020.xlsx',
}

let dataPerActivity = [], dataPerExpenditure = [], dataTotals = [];

function getValue(cell) {
  if (cell.formula) {
    let calculated = parser.parse(cell.formula);
    if (calculated.error) throw calculated.error;
    else return calculated.result;
  } else {
    return cell.value;
  }
}

for (let year in files) {
  let file = files[year];
  if (!file) continue;
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(file);
  const worksheet = workbook.worksheets[0];

  parser.on('callCellValue', function(cellCoord, done) {
    if (worksheet.getCell(cellCoord.label).formula) {
      done(parser.parse(worksheet.getCell(cellCoord.label).formula).result);
    } else {
      done(worksheet.getCell(cellCoord.label).value);
    }
  });

  parser.on('callRangeValue', function(startCellCoord, endCellCoord, done) {
    var fragment = [];
    for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
      var colFragment = [];
      for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
        colFragment.push(worksheet.getRow(row + 1).getCell(col + 1).value);
      }
      fragment.push(colFragment);
    }
    if (fragment) {
      done(fragment);
    }
  });

  let lastActivity = null;

  worksheet.eachRow((row, rowNumber) => {
    let firstCell = getValue(row.getCell(1));//.value;
    let titleActivity = firstCell?.match(/^(\d+)\s+(.*)/);
    let titleTotal = firstCell === 'ОБЩО';
    if (titleActivity) {
      lastActivity = `Дейност ${titleActivity[1]} "${titleActivity[2]}"`;
      for (let i = 0; i < priAreaNo; i++) {
        let nat = getValue(row.getCell(2+i*3));//.value
        let eu = getValue(row.getCell(2+i*3+2));//.value;
        if (!nat && !eu) continue;
        dataPerActivity.push({
          'Приоритетна област': getValue(worksheet.getCell(1,2 + i*3))./*value.*/match(/\d+: (.*)/)[1],
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
        let nat = getValue(row.getCell(2+i*3));//.value
        let eu = getValue(row.getCell(2+i*3+2));//.value;
        dataTotals.push({
          'Приоритетна област': getValue(worksheet.getCell(1,2 + i*3))./*value.*/match(/\d+: (.*)/)[1],
          'Година': Number.parseInt(year),
          'Средства в лв. от националния бюджет (без национални програми)': nat || 0,
          'Средства от ЕС и други международни проекти и програми в лв.': eu || 0,
        });
      }
    } else if (lastActivity && !firstCell.startsWith('Забележка')) {
      for (let i = 0; i < priAreaNo; i++) {
        let nat = getValue(row.getCell(2+i*3));//.value
        let eu = getValue(row.getCell(2+i*3+2));//.value;
        if (!nat && !eu) continue;
        dataPerExpenditure.push({
          'Приоритетна област': getValue(worksheet.getCell(1,2 + i*3))./*value.*/match(/\d+: (.*)/)[1],
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
  if (rowNumber === 1) return;// console.log(rowNumber); console.log(row.getCell(1))
  modules.push({
    'Приоритетна област': getValue(row.getCell(1))./*value.*/match(/\d+: (.*)/)[1],
    'Програма':  getValue(row.getCell(2))/*.value?*/?.replaceAll('\n',' ')?.replaceAll(/["“„”]/g,''),
    'Модул': getValue(row.getCell(3))/*.value?*/?.replaceAll('\n',' ')?.replaceAll(/["“„”]/g,'') || '',
    'Вид': getValue(row.getCell(4))/*.value*/,
    'Средства': getValue(row.getCell(5))/*.value.result || row.getCell(5).value*/,
    'Година': getValue(row.getCell(6))/*.value*/,
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

fs.writeFileSync('data-per-activity.csv','\ufeff' + stringify(dataPerActivity,{
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

fs.writeFileSync('data-per-module.csv','\ufeff' + stringify(modules,{
  header: true,
  delimiter: '\t',
}), 'utf-8');