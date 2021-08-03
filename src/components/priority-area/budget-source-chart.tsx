import { sum } from 'lodash';
import { useTheme } from 'react-jss';
import Plot from 'react-plotly.js';
import { BudgetSourceType, ModuleData } from '../../services/data';
import { PriorityArea } from '../../services/priority-areas';
import { AreaTheme, generateShades } from '../../themes';
import YearBreakdown from '../../year-breakdown';
import { CHART_HEIGHT, CHART_WIDTH, useStyles } from './budget-source-chart.styles';

type BudgetSourceChartProps = {
  area: PriorityArea;
  budgetData: ModuleData[];
};

function getDataByType(budgetData: ModuleData[], type: BudgetSourceType) {
  return budgetData
    .filter(d => d.type === type)
    .sort((d1, d2) => d2.budget - d1.budget);
}

function getModuleName(moduleData: ModuleData) {
  if (moduleData.module) {
    return `${moduleData.program}\n${moduleData.module}`;
  }
  return moduleData.program;
}

const BudgetSourceEntryComponent = ({ moduleData, totalBudget, color }: { moduleData: ModuleData, totalBudget: number, color: string }) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const pct = Math.round(moduleData.budget * 10000 / totalBudget) / 100;

  return (
    <div className={classes.budgetSourceEntry}>
      <div
        className={classes.budgetSourceLogo}
        style={{
          backgroundColor: color,
        }}
      />
      <div className={classes.budgetSourceDescription}>
        <div className={classes.budgetSourceName}>
          { moduleData.program }
        </div>
        {moduleData.module && (
          <div className={classes.budgetSourceName}>
            { moduleData.module }
          </div>
        )}
        <div>{pct}% - {moduleData.budget}лв</div>
      </div>
    </div>
  )
};

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

  const totalAreaBudget = sum(reordered.map(d => d.budget));

  return (
    <div className={classes.budgetSourceChartContainer}>
      <p>Заглавие, което обяснява какво показва тази графика</p>
      <div className={classes.budgetSourceContainer}>
        <div className={classes.budgetSourceChartContainer}>
          <YearBreakdown />
          <Plot
            data={[
              {
                labels: reordered.map(d => getModuleName(d)),
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
              width: CHART_WIDTH, height: CHART_HEIGHT,
            }}
          />
        </div>
        <div className={classes.budgetSourceLegend}>
          { reordered.map((moduleData, idx) => (
          <BudgetSourceEntryComponent
            key={getModuleName(moduleData)}
            moduleData={moduleData}
            totalBudget={totalAreaBudget}
            color={reorderedColors[idx]}
          />
          )) }
        </div>
      </div>
    </div>
  );
};

export default BudgetSourceChartComponent;
