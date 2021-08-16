import React from 'react';
import { AreaLegend } from './area-legend';
import { useStyles } from './budget-chart.styles';
import { Plot } from './lib/util';
import { ModuleData } from './services/data';
import { getAreaTheme } from './themes';
import YearBreakdown from './year-breakdown';

type BudgetChartProps = {
  budgetData: ModuleData[],
};

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetData }) => {
  const classes = useStyles();
  return (
    <div className={classes.budgetChartContainer}>
      <div className={classes.budgetChartChartContainer}>
      <h2 className="chart-title">Изразходвани средства по приоритетна област (на годишна база)</h2>
      <YearBreakdown/>
      <Plot
        config={{ displayModeBar: false }}
        data={[
          {
            labels: budgetData.map(d => d.area),
            values: budgetData.map(d => d.budget),
            marker: {
              colors: budgetData.map(d => getAreaTheme(d.area).primaryColor),
            },
            type: 'pie',
            showlegend: false,
          },
        ]}
        layout={ {width: 460, height: 480, dragmode: false } }
      />
      </div>
      <AreaLegend budgetData={budgetData}></AreaLegend>
    </div>
  );
}

export { BudgetChart };
