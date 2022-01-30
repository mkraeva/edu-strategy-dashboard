import React from 'react';
import { AreaLegend } from './area-legend';
import { useStyles } from './budget-chart.styles';
import { CHART_CONFIG, PIE_CHART_LAYOUT } from './components/priority-area/common.styles';
import { Plot } from './lib/util';
import { sumBy, uniq } from 'lodash';
import { ModuleData, BudgetSourceType } from './services/data';
import { getAreaTheme } from './themes';
import YearBreakdown from './year-breakdown';
import NumberFormat from 'react-number-format';

type BudgetChartProps = {
  budgetData: ModuleData[],
};

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetData }) => {
  const classes = useStyles();
  return (
    <div className={classes.budgetChartContainer}>
      <div className={classes.budgetChartChartContainer}>
        <h2 className={[classes.budgetChartTitle, "chart-title"].join(' ')}>Изразходвани средства по приоритетна област (на годишна база)</h2>
        <YearBreakdown/>
        <Plot
          config={CHART_CONFIG}
          data={[
            {
              labels: budgetData.filter(d => d.type !== BudgetSourceType.EuropeanProgram).map(d => d.area),
              values: budgetData.filter(d => d.type !== BudgetSourceType.EuropeanProgram).map(d => d.budget),
              marker: {
                colors: budgetData.filter(d => d.type !== BudgetSourceType.EuropeanProgram).map(d => getAreaTheme(d.area).primaryColor),
              },
              type: 'pie',
              texttemplate: '%{percent:.2%}',
              textposition: 'inside',
              hovertemplate: '%{label}<br>%{percent:.2%}<br>%{value}<extra></extra>',
              showlegend: false,
              // textinfo: 'none',
            },
          ]}
          layout={PIE_CHART_LAYOUT}
        />
        <div className={classes.totalsData}>
          <div>
            <p className={classes.totalsNumber}>
              <NumberFormat
                value={sumBy(budgetData.filter(d => d.type !== BudgetSourceType.EuropeanProgram),'budget')}
                thousandSeparator={true}
                decimalScale={0}
                suffix=" лв."
                displayType="text"
              />
            </p>
            отчетени разходи
          </div>
          <div>
            <p className={classes.totalsNumber}>
              {uniq(budgetData.filter(d => d.type === BudgetSourceType.NationalProgram).map(d=>d.program)).length}
            </p>
            изпълнявани национални програми
          </div>
          <div>
            <p className={classes.totalsNumber}>
              {uniq(budgetData.filter(d => d.type === BudgetSourceType.EuropeanProgram).map(d=>d.program)).length}
            </p>
            изпълнявани европейски проекти и програми
          </div>
        </div>
      </div>
      <AreaLegend budgetData={budgetData}></AreaLegend>
    </div>
  );
}

export { BudgetChart };
