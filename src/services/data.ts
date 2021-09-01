import { uniq } from 'lodash';
import Papa from 'papaparse';
import packageJson from '../../package.json';
import { hashActivity } from '../lib/util';

const DATA_FILE_PREFIX = packageJson.dataFilePrefix || process.env.PUBLIC_URL;

export enum BudgetSourceType {
  NationalProgram = 'Национална програма',
  EuropeanProgram = 'Европейски програми и проекти',
  YearlyBudget = 'Бюджет',
  ExternalSource = 'Външен източник'
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
  'Средства в лв. от националния бюджет (без национални програми)': 'nationalBudget',
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
          const uniqueActivities = uniq(data.map(a => (a as any).activity));
          const hashes = uniqueActivities.map(a => hashActivity(a));
          const sanityCheck = uniq(hashes);
          if (hashes.length !== sanityCheck.length) {
            reject('Някои дейности имат еднакъв хеш!');
          }
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
  isTarget: boolean;
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
          (data as any[]).forEach(d => {
            const target = "цел";
            if(d.year && typeof d.year !== 'number') {
              d.isTarget = true;
              d.year = Number.parseInt(d.year.substring(target.length))
            }
          });

          resolve(data as IndicatorData[]);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export interface ExpenditureData extends HasYear {
  area: string;
  activity: string;
  expenseType: string;
  nationalBudget: number;
  externalBudget: number;
}

const expenditureHeaderMapping: {[key: string]: string} = {
  'Приоритетна област': 'area',
  'Дейност': 'activity',
  'Перо': 'expenseType',
  'Година': 'year',
  'Средства в лв. от националния бюджет (без национални програми)': 'nationalBudget',
  'Средства от ЕС и други международни проекти и програми в лв.': 'externalBudget',
};

export async function fetchExpenditureData() {
  return new Promise<ExpenditureData[]>((resolve, reject) => {
    Papa.parse(`${DATA_FILE_PREFIX}/data-expenditure.csv?refresh=${Date.now()}`, {
      download: true,
      delimiter: '\t',
      dynamicTyping: true,
      skipEmptyLines: true,
      header: true,
      transformHeader: (header => expenditureHeaderMapping[header] || header),
      transform: (value) => value.trim(),
      complete: ({ errors, data }) => {
        if (errors?.length) {
          reject(errors);
        } else {
          resolve(data as ExpenditureData[]);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
