import React from 'react';
import { AreaLegend } from './area-legend';
import { useStyles } from './budget-chart.styles';
import { CHART_CONFIG, PIE_CHART_LAYOUT } from './components/priority-area/common.styles';
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
        config={CHART_CONFIG}
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
        layout={PIE_CHART_LAYOUT}
      />
      </div>
      <AreaLegend budgetData={budgetData}></AreaLegend>
    </div>
  );
}

export { BudgetChart };
