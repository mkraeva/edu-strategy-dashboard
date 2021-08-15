import { useTheme } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStyles } from './area-legend-entry.styles';
import { PriorityArea } from './services/priority-areas';
import { AreaTheme } from './themes';
import NumberFormat from 'react-number-format';

type AreaLegendEntryProps = {
  area: PriorityArea;
  areaBudget: number;
  totalBudget: number;
}

const AreaLegendEntry = ({area, areaBudget, totalBudget }: AreaLegendEntryProps) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const budgetPercentage = Math.round(areaBudget * 10000 / totalBudget) / 100;

  return (<div className={classes.areaLegendEntry}>
    <img className={classes.areaLogo} src={area.logo} alt=""></img>
    <div className={classes.areaData}>
      <div className={classes.areaName}>{area.name}</div>
      <div className={classes.areaStats}>
        <NumberFormat
          value={areaBudget}
          thousandSeparator={true}
          suffix=" лв."
          displayType="text"
        />
        &nbsp;<span className={classes.areaPercentage}>[{budgetPercentage}%]</span>
      </div>
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