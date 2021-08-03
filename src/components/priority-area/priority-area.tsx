import { ThemeProvider } from 'react-jss';
import { useParams } from 'react-router-dom';
import { useStyles } from './priority-area.styles';
import { ActivityData, ModuleData } from '../../services/data';
import { priorityAreas } from '../../services/priority-areas';
import { getAreaTheme } from '../../themes';
import BudgetSourceChartComponent from './budget-source-chart';
import { ActivityBudgetChart } from '../../activity-budget-chart';

export type PriorityAreaProps = {
  budgetData: ModuleData[];
  activityData: ActivityData[];
}

const PriorityArea = (props: PriorityAreaProps) => {
  const params = useParams<{ id: string }>();
  const areaId = Number(params.id);
  const area = priorityAreas.find(({ id }) => id === areaId)!;
  const theme = getAreaTheme(area.name);
  const classes = useStyles({ theme, ...props });

  const data = props.budgetData.filter(d => d.area === area.name);
  const activityData = props.activityData.filter(d => d.area === area.name);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.priorityArea}>
        <div className={classes.header}>
          <img className={classes.areaLogo} src={area.logo} alt=""></img>
          <div className={classes.headerTitle}>
            <div>Приоритетна област</div>
            <div className={classes.headerAreaName}>{area.name}</div>
          </div>
        </div>

        <BudgetSourceChartComponent area={area} budgetData={data}/>
        <ActivityBudgetChart activityData={activityData}/>
      </div>
    </ThemeProvider>
  );
}

export default PriorityArea;
