import { zip } from "lodash";
import { priorityAreas } from "./services/priority-areas";

export interface AreaTheme {
  primaryColor: string;
  nationalProgramColor: string;
  euProgramColor: string;
  budgetColor: string;

  textColor: string;
}

export const areaColors = [
  '#8A0464',
  '#EF4643',
  '#FAB316',
  '#82C44A',
  '#7EA4A4',
  '#3ABC95',
  '#12BCBF',
  '#02618F',
  '#024F7A',
];

const nationalProgramColors = areaColors;

const budgetColors = [
  '#12BCBF',
  '#7EA4A4',
  '#3ABC95',
  '#8A0464',
  '#82C44A',
  '#EF4643',
  '#FAB316',
  '#8A0464',
  '#EF4643',
];

const europeanProgramColors = [
  '#02618F',
  '#02618F',
  '#02618F',
  '#02618F',
  '#02618F',
  '#02618F',
  '#02618F',
  '#82C44A',
  '#82C44A',
];

export const areaThemes: AreaTheme[] = zip(
  areaColors,
  nationalProgramColors,
  europeanProgramColors,
  budgetColors
).map(([area, np, eu, budget]) => {
  if (!area || !np || !eu || !budget) {
    throw new Error('Color scheme mismatch!');
  }
  return {
    primaryColor: area,
    nationalProgramColor: np,
    euProgramColor: eu,
    budgetColor: budget,

    textColor: '#002A41',
  };
});

export function getAreaTheme(areaName: string) {
  const areaIdx = priorityAreas.map(area => area.name).indexOf(areaName);
  return areaThemes[areaIdx];
}