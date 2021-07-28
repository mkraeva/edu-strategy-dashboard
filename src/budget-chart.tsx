import React from 'react';
import Plot from 'react-plotly.js';
import { AreaLegend } from './area-legend';
import { useStyles } from './budget-chart.styles';
import { ModuleData } from './services/data';
import { getAreaTheme } from './themes';

type BudgetChartProps = {
  budgetData: ModuleData[],
};

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetData }) => {
  const classes = useStyles();
  return (
    <div className={classes.budgetChartContainer}>
      <Plot
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
        layout={ {width: 860, height: 480, title: 'Заглавие, което обяснява какво показва тази графика'} }
      />
      <AreaLegend budgetData={budgetData}></AreaLegend>
    </div>
  );
}

export { BudgetChart };