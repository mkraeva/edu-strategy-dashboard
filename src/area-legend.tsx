import { sortBy, sum } from "lodash";
import React from "react";
import { ThemeProvider } from "react-jss";
import AreaLegendEntry from "./area-legend-entry";
import { NationalEUBudgetLegend } from "./components/priority-area/national-vs-eu-budget-legend";
import { groupBy } from "./lib/util";
import { BudgetSourceType, ModuleData } from "./services/data";
import { priorityAreas } from "./services/priority-areas";
import { getAreaTheme } from "./themes";

type BudgetChartProps = {
  budgetData: ModuleData[];
};

export const AreaLegend: React.FC<BudgetChartProps> = ({
  budgetData,
}: BudgetChartProps) => {
  const grouped = groupBy(budgetData, "area");
  const totalBudget = sum(budgetData.map((d) => d.budget));
  const budgetByArea = new Map(
    Array.from(grouped.entries()).map(([areaName, areaModules]) => [
      areaName,
      {
        nationalBudget: sum(
          areaModules
            .filter(
              (d) =>
                [
                  BudgetSourceType.NationalProgram,
                  BudgetSourceType.YearlyBudget,
                ].indexOf(d.type) >= 0
            )
            .map((d) => d.budget)
        ),
        externalBudget: sum(
          areaModules
            .filter(
              (d) =>
                [
                  // BudgetSourceType.EuropeanProgram,
                  BudgetSourceType.ExternalSource,
                ].indexOf(d.type) >= 0
            )
            .map((d) => d.budget)
        ),
      },
    ])
  );
  const sortedPriorityAreas = sortBy(
    priorityAreas,
    (area) => -(budgetByArea.get(area.name) || 0)
  );
  return (
    <div className="legend">
      <div style={{ paddingLeft: 50 }}>
        <NationalEUBudgetLegend/>
      </div>
      {sortedPriorityAreas.map((area) => (
        <ThemeProvider theme={getAreaTheme(area.name)} key={area.name}>
          <AreaLegendEntry
            area={area}
            nationalBudget={budgetByArea.get(area.name)?.nationalBudget || 0}
            externalBudget={budgetByArea.get(area.name)?.externalBudget || 0}
            totalBudget={totalBudget}
          />
        </ThemeProvider>
      ))}
    </div>
  );
};
