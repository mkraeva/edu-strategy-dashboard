import { ThemeProvider } from "react-jss";
import { useParams } from "react-router-dom";
import { ActivityBudgetChart } from "./activity-budget/activity-budget-chart";
import { ActivityData, ExpenditureData, IndicatorData, ModuleData } from "../../services/data";
import { priorityAreas } from "../../services/priority-areas";
import { getAreaTheme } from "../../themes";
import BudgetSourceChartComponent from "./budget-source-chart";
import IndicatorChartSelector from "./indicator-chart";
import { useStyles } from "./priority-area.styles";

export type PriorityAreaProps = {
  budgetData: ModuleData[];
  activityData: ActivityData[];
  expenditureData: ExpenditureData[];
  indicatorData: IndicatorData[];
};

const PriorityArea = (props: PriorityAreaProps) => {
  const params = useParams<{ id: string }>();
  const areaId = Number(params.id) - 1;
  const area = priorityAreas.find(({ id }) => id === areaId)!;
  const theme = getAreaTheme(area.name);
  const classes = useStyles({ theme, ...props });

  const data = props.budgetData.filter((d) => d.area === area.name);
  const activityData = props.activityData.filter((d) => d.area === area.name);
  const indicatorData = props.indicatorData.filter((d) => d.area === area.name);
  const expenditureData = props.expenditureData.filter(d => d.area === area.name);

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

        <BudgetSourceChartComponent area={area} budgetData={data} />
        <ActivityBudgetChart activityData={activityData} expenditureData={expenditureData} />
        <IndicatorChartSelector indicatorData={indicatorData} mainArea={false} />
      </div>
    </ThemeProvider>
  );
};

export default PriorityArea;
