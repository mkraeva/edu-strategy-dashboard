import { useTheme } from 'react-jss';
import { useStyles } from './area-legend-entry.styles';
import { PriorityArea } from './services/priority-areas';
import { AreaTheme } from './themes';

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
      <div className={classes.areaStats}>{budgetPercentage}% - {areaBudget}лв.</div>
      <button className={classes.seeMore}>Виж повече</button>
    </div>
  </div>
  )
};

export default AreaLegendEntry;