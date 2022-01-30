import { sum } from 'lodash';
import { useTheme } from 'react-jss';
import { Plot } from '../../lib/util';
import { BudgetSourceType, ModuleData } from '../../services/data';
import { PriorityArea } from '../../services/priority-areas';
import { AreaTheme, generateShades } from '../../themes';
import YearBreakdown from '../../year-breakdown';
import { useStyles } from './budget-source-chart.styles';
import NumberFormat from 'react-number-format';
import { CHART_CONFIG, PIE_CHART_LAYOUT } from './common.styles';
import { NationalEUBudgetLegend } from './national-vs-eu-budget-legend';

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

const BudgetSourceEntryComponent = (
  { moduleData, totalBudget, color, children }:
  { moduleData: ModuleData, totalBudget: number, color: string, children: ModuleData[] }
  ) => {
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
        <div>
          <NumberFormat
            value={moduleData.budget}
            thousandSeparator={true}
            suffix=" лв."
            displayType="text"
            decimalScale={2}
          />
          &nbsp;<span style={{
            //backgroundColor: `${color}55`,
            //fontWeight: 'bold',
            padding: '0 3px 3px'
          }}>[{pct}%]</span>
          {!!children.length &&
            <>
              <p>В това число средства по проекти:</p>
              {children.map((c,idx) => (
                <div key={idx}>
                  <div
                    className={classes.budgetSourceEuProgramLogo}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  <span className={classes.euProgram}>
                    {c.program}
                  </span>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  )
};

const BudgetSourceChartComponent = ({ budgetData, area }: BudgetSourceChartProps) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const nationalPrograms = getDataByType(budgetData, BudgetSourceType.NationalProgram);
  const euPrograms = getDataByType(budgetData, BudgetSourceType.ExternalSource);
                      // getDataByType(budgetData, BudgetSourceType.EuropeanProgram)
                      // .concat(getDataByType(budgetData, BudgetSourceType.ExternalSource));
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
    <div className={classes.mainContainer}>
      <h2 className="chart-title">
        Източници на финансиране в тази приоритетна област
      </h2>
      <p>Графиката показва разпределението на средствата по източниците на финансиране: национални програми, проекти с финансиране от ЕС или друга международна програма, както и средства от националния бюджет извън националните програми</p>
      <div className={classes.dataContainer}>
        <div className={classes.budgetSourceChartContainer}>
          <YearBreakdown />
          <Plot
            config={CHART_CONFIG}
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
                texttemplate: '%{percent:.2%}',
                textposition: 'inside',
                hovertemplate: '%{label}<br>%{percent:.2%}<br>%{value}<extra></extra>',
              },
            ]}
            layout={PIE_CHART_LAYOUT}
          />
          <NationalEUBudgetLegend includeNationalPrograms={true}/>
          <div className={classes.totalSum}>Обща сума:&nbsp;
            <NumberFormat
              value={totalAreaBudget}
              thousandSeparator={true}
              suffix=" лв."
              displayType="text"
              decimalScale={2}
            />
          </div>
        </div>
        <div className={classes.budgetSourceLegend}>
          { reordered.map((moduleData, idx) => (
          <BudgetSourceEntryComponent
            key={getModuleName(moduleData) || idx}
            moduleData={moduleData}
            totalBudget={totalAreaBudget}
            color={reorderedColors[idx]}
            children={
              moduleData.type === BudgetSourceType.ExternalSource ?
              getDataByType(budgetData, BudgetSourceType.EuropeanProgram) :
              []
            }
          />
          )) }
        </div>
      </div>
    </div>
  );
};

export default BudgetSourceChartComponent;
