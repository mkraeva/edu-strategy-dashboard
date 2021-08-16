import { useTheme } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStyles } from './area-legend-entry.styles';
import { PriorityArea } from './services/priority-areas';
import { AreaTheme } from './themes';
import NumberFormat from 'react-number-format';
import { BudgetSourceBreakdownBarChart } from './components/priority-area/budget-breakdown-bar-chart';

type AreaLegendEntryProps = {
  area: PriorityArea;
  nationalBudget: number;
  externalBudget: number;
  totalBudget: number;
}

const AreaLegendEntry = ({area, nationalBudget, externalBudget, totalBudget }: AreaLegendEntryProps) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const totalAreaBudget = (nationalBudget + externalBudget);
  const budgetPercentage = totalAreaBudget / totalBudget * 100;

  return (<div className={classes.areaLegendEntry}>
    <img className={classes.areaLogo} src={area.logo} alt=""></img>
    <div className={classes.areaData}>
      <div className={classes.areaName}>{area.name}</div>
      <div className={classes.areaStats}>
        <NumberFormat
          value={totalAreaBudget}
          thousandSeparator={true}
          suffix=" лв."
          displayType="text"
        />
        &nbsp;<span className={classes.areaPercentage}>[{budgetPercentage.toPrecision(2)}%]</span>
      </div>
      <BudgetSourceBreakdownBarChart areaThemed={false} data={{
        name: "",
        nationalBudget: nationalBudget,
        euBudget: externalBudget,
      }}/>
      <Link
        to={`/priority-area/${area.id}`}
        className={classes.seeMore}
      >
        Виж повече
      </Link>
    </div>
  </div>
  )
};

export default AreaLegendEntry;
