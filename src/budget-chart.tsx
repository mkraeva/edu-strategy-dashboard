import React from 'react';
import { AreaLegend } from './area-legend';
import { useStyles } from './budget-chart.styles';
import { CHART_CONFIG, PIE_CHART_LAYOUT } from './components/priority-area/common.styles';
import { Plot } from './lib/util';
import { sumBy } from 'lodash';
import { ModuleData } from './services/data';
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
              textinfo: 'none',
            },
          ]}
          layout={PIE_CHART_LAYOUT}
        />
        <div className={classes.totalsData}>
          <div>
            <p className={classes.totalsNumber}>
              <NumberFormat
                value={sumBy(budgetData,'budget')}
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
              {budgetData.filter(d => d.type === 'Национална програма').length}
            </p>
            изпълнявани национални програми
          </div>
          <div>
            <p className={classes.totalsNumber}>
              {budgetData.filter(d => d.type === 'Европейски програми и проекти').length}
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
