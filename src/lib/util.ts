import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js';

export const Plot = createPlotlyComponent(Plotly);

export function groupBy<Entity>(data: Entity[], byKey: string) {
  const result = new Map<string, Entity[]>();
  for (const entity of data) {
    const key = (entity as any)[byKey];
    if (!result.has(key)) {
      result.set(key, [entity]);
    } else {
      result.get(key)?.push(entity);
    }
  }
  return result;
}

export function formatLv(value: number) {
  return value?.toLocaleString("en-US") + " лв.";
}
