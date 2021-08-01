import Papa from 'papaparse';

export enum BudgetSourceType {
  NationalProgram = 'Национална програма',
  EuropeanProgram = 'Европейски програми и проекти',
  YearlyBudget = 'Бюджет',
}

export interface HasYear {
  year: number;
}

export interface ModuleData extends HasYear {
  area: string;
  type: BudgetSourceType;
  program: string;
  module: string;
  budget: number;
}

const dataPerModuleHeaderMapping: {[key: string]: string} = {
  'Приоритетна област': 'area',
  'Дейност': 'program',
  'Модул': 'module',
  'Вид': 'type',
  'Средства': 'budget',
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

export interface ActivityData extends HasYear {
  area: string;
  activity: string;
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
