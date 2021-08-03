import { useTheme } from 'react-jss';
import Plot from 'react-plotly.js';
import { BudgetSourceType, ModuleData } from '../../services/data';
import { PriorityArea } from '../../services/priority-areas';
import { AreaTheme, generateShades } from '../../themes';
import YearBreakdown from '../../year-breakdown';
import { useStyles } from './budget-source-chart.styles';

type BudgetSourceChartProps = {
  area: PriorityArea;
  budgetData: ModuleData[];
};

function getDataByType(budgetData: ModuleData[], type: BudgetSourceType) {
  return budgetData
    .filter(d => d.type === type)
    .sort((d1, d2) => d2.budget - d1.budget);
}

const BudgetSourceChartComponent = ({ budgetData, area }: BudgetSourceChartProps) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const nationalPrograms = getDataByType(budgetData, BudgetSourceType.NationalProgram);
  const euPrograms = getDataByType(budgetData, BudgetSourceType.EuropeanProgram);
  const budgetItems = getDataByType(budgetData, BudgetSourceType.YearlyBudget);

  const nationalProgramShades = generateShades(
    theme.nationalProgramColor,
    nationalPrograms.length,
  );

  const euProgramShades = generateShades(
    theme.euProgramColor,
    euPrograms.length,
  );

  const budgetShades = generateShades(
    theme.budgetColor,
    budgetItems.length,
  );

  const reordered = nationalPrograms.concat(euPrograms, budgetItems);
  const reorderedColors = nationalProgramShades.concat(euProgramShades, budgetShades);

  return (
    <div className={classes.budgetSourceContainer}>
      <div className={classes.budgetSourceChartChartContainer}>
        <YearBreakdown />
        <p>Заглавие, което обяснява какво показва тази графика</p>
        <Plot
          data={[
            {
              labels: reordered.map(d => `${d.program} ${d.module}`),
              values: reordered.map(d => d.budget),
              marker: {
                colors: reorderedColors,
              },
              type: 'pie',
              showlegend: false,
              sort: false,
              textinfo: 'none',
            },
          ]}
          layout={{
            width: 460, height: 480,
          }}
        />
      </div>
      <div className={classes.budgetSourceLegend}>
        { reordered.map((moduleData, idx) => (
          <div className={classes.budgetSourceEntry}>
            <div
              className={classes.budgetSourceLogo}
              style={{
                backgroundColor: reorderedColors[idx],
              }}
            />
            <div>{moduleData.program}</div>
          </div>
        )) }
      </div>
    </div>
  );
};

export default BudgetSourceChartComponent;
