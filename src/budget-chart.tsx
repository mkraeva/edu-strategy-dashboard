import { sortBy, sum, uniq } from "lodash";
import React from "react";
import Plot from "react-plotly.js";
import { groupBy } from "./lib/util";
import { ModuleData } from "./services/data";


type BudgetChartProps = {
  budgetData: ModuleData[],
};

class AreaLegend extends React.Component<BudgetChartProps, {}> {
  private renderAreaLegendEntry(area: string, areaModules: ModuleData[]) {
    const totalBudget = sum(this.props.budgetData.map(d => d.budget));
    const areaBudget = sum(areaModules.map(d => d.budget));
    return (
      <div className="areaLegendEntry">
        <div className="areaLogo">logo</div>
        <div className="label">{area}</div>
        <div className="stats">{Math.round(areaBudget * 10000 / totalBudget)/100}% - {areaBudget}лв.</div>
      </div>
    )
  }
  render() {
    const { budgetData } = this.props;
    const areas = sortBy(uniq(budgetData.map(d => d.area)));
    const grouped = groupBy(budgetData, 'area');
    return (
      <div className="legend">
        { areas.map(area => this.renderAreaLegendEntry(area, grouped.get(area) || []))}
      </div>
    );
  }
}

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetData }) => {
  return (
    <div>
      <Plot
        data={[
          {
            labels: budgetData.map(d => d.area),
            values: budgetData.map(d => d.budget),
            type: 'pie',
            showlegend: false,
          },
        ]}
        layout={ {width: 860, height: 480, title: 'Заглавие, което обяснява какво показва тази графика '} }
      />
      <AreaLegend budgetData={budgetData}></AreaLegend>
    </div>
  );
}

export { BudgetChart };