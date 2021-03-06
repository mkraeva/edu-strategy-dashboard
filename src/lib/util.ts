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

const hashCache = new Map<string, string>();
export function hashActivity(value: string) {
  if (hashCache.has(value)) {
    return hashCache.get(value)!;
  }

  const MAX_HASH = 1 << 28; // 7 digits in hex
  let h = 0;
  let length = value.length;
  for (let i = 0; i < length; i++) {
      h = 31 * h + value.charCodeAt(i);
      h = h % MAX_HASH;
  }
  let hash = h.toString(16);
  hashCache.set(value, hash);
  return hash;
}

export function isMatchingActivity(activityName: string, selectionHash: string) {
  return hashActivity(activityName) === selectionHash;
}

