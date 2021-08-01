import { sortBy, sum } from 'lodash';
import React from 'react';
import { ThemeProvider } from 'react-jss';
import AreaLegendEntry from './area-legend-entry';
import { groupBy } from './lib/util';
import { ModuleData } from './services/data';
import { priorityAreas } from './services/priority-areas';
import { getAreaTheme } from './themes';

type BudgetChartProps = {
  budgetData: ModuleData[];
}


export const AreaLegend: React.FC<BudgetChartProps> = ({ budgetData }: BudgetChartProps) => {
  const grouped = groupBy(budgetData, 'area');
  const totalBudget = sum(budgetData.map(d => d.budget));
  const budgetByArea = new Map(
    Array.from(grouped.entries()).map(
      ([areaName, areaModules]) => [areaName, sum(areaModules.map(d => d.budget))]
    )
  );
  const sortedPriorityAreas = sortBy(priorityAreas, (area) => -(budgetByArea.get(area.name) || 0));
  return (
    <div className="legend">
      {
        sortedPriorityAreas.map(area => (
            <ThemeProvider theme={getAreaTheme(area.name)} key={area.name}>
              <AreaLegendEntry
                area={area}
                areaBudget={budgetByArea.get(area.name) || 0}
                totalBudget={totalBudget}
              ></AreaLegendEntry>
            </ThemeProvider>
        ))
      }
    </div>
  );
}
