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
  'Година': 'year'
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
      transform: (value) => value.trim(),
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

export interface ActivityData {
  area: string;
  activity: string;
  year: number;
  nationalBudget: number;
  externalBudget: number;
}

const dataPerActivityHeaderMapping: {[key: string]: string} = {
  'Приоритетна област': 'area',
  'Дейност': 'activity',
  'Година': 'year',
  'Средства в лв. от националния бюджет': 'nationalBudget',
  'Средства от ЕС и други международни проекти и програми в лв.': 'externalBudget',
};

export async function fetchDataPerActivity() {
  return new Promise<ActivityData[]>((resolve, reject) => {
    Papa.parse(`${process.env.PUBLIC_URL}/data-per-activity.csv`, {
      download: true,
      delimiter: '\t',
      dynamicTyping: true,
      skipEmptyLines: true,
      header: true,
      transformHeader: (header => dataPerActivityHeaderMapping[header] || header),
      transform: (value) => value.trim(),
      complete: ({ errors, data }) => {
        if (errors?.length) {
          reject(errors);
        } else {
          resolve(data as ActivityData[]);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
