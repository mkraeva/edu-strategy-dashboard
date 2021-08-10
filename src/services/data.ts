import Papa from 'papaparse';
import packageJson from '../../package.json';

const DATA_FILE_PREFIX = packageJson.dataFilePrefix || process.env.PUBLIC_URL;

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
  'Програма': 'program',
  'Модул': 'module',
  'Вид': 'type',
  'Средства': 'budget',
  'Година': 'year'
};

export async function fetchDataPerModule() {
  return new Promise<ModuleData[]>((resolve, reject) => {
    Papa.parse(`${DATA_FILE_PREFIX}/data-per-module.csv?refresh=${Date.now()}`, {
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
    Papa.parse(`${DATA_FILE_PREFIX}/data-per-activity.csv?refresh=${Date.now()}`, {
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

export interface IndicatorData extends HasYear {
  area: string;
  name: string;
  value: number;
  euAverage: number;
  publishingPeriod: string;
  sourceLink: string;
}

const dataIndicatorPerAreaHeaderMapping: {[key: string]: string} = {
  'Приоритетна област': 'area',
  'Индикатор': 'name',
  'Година': 'year',
  'България': 'value',
  'Средно за ЕС': 'euAverage',
  'Периодичност на публикуване': 'publishingPeriod',
  'Източник/Линк': 'sourceLink',
};

export async function fetchDataPerAreaIndicator() {
  return new Promise<IndicatorData[]>((resolve, reject) => {
    Papa.parse(`${DATA_FILE_PREFIX}/data-indicators-per-area.csv?refresh=${Date.now()}`, {
      download: true,
      delimiter: '\t',
      dynamicTyping: true,
      skipEmptyLines: true,
      header: true,
      transformHeader: (header => dataIndicatorPerAreaHeaderMapping[header] || header),
      transform: (value) => value.trim(),
      complete: ({ errors, data }) => {
        if (errors?.length) {
          reject(errors);
        } else {
          resolve(data as IndicatorData[]);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
