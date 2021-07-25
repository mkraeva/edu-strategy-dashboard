import Papa from 'papaparse';

export interface ModuleData {
  area: string;
  program: string;
  module: string;
  budget: number;
}

const dataPerModuleHeaderMapping: {[key: string]: string} = {
  'Приоритетна област': 'area',
  'Национална програма': 'program',
  'Модул': 'module',
  'Средства в лв.': 'budget',
};

export async function fetchDataPerModule() {
  return new Promise<ModuleData[]>((resolve, reject) => {
    Papa.parse(`${process.env.PUBLIC_URL}/data-per-module.csv`, {
      download: true,
      delimiter: '\t',
      dynamicTyping: true,
      skipEmptyLines: true,
      header: true,
      transformHeader: (header => dataPerModuleHeaderMapping[header] || header),
      complete: ({ errors, data }) => {
        if (errors?.length) {
          reject(errors);
        } else {
          resolve(data as ModuleData[]);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}