import { priorityAreas } from "./services/priority-areas";

export interface AreaTheme {
  primaryColor: string;
  secondaryColor: string;
  ternaryColor: string;
}
export const areaThemes: AreaTheme[] = priorityAreas.map(area => ({
  primaryColor: area.color,
  // TODO: waiting for color combinations from @rsofronieva
  secondaryColor: 'white',
  ternaryColor: 'black',
}));

export function getAreaTheme(areaName: string) {
  const areaIdx = priorityAreas.map(area => area.name).indexOf(areaName);
  return areaThemes[areaIdx];
}