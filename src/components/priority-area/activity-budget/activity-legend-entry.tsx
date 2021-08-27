import { useTheme } from "react-jss";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { hashActivity, isMatchingActivity } from "../../../lib/util";
import { ActivityData } from "../../../services/data";
import { AreaTheme } from "../../../themes";
import { BudgetSourceBreakdownBarChart } from "../budget-breakdown-bar-chart";
import { useStyles } from "./activity-legend-entry.styles";
import { ReactComponent as SeeChartIcon } from '../../icons/see-chart-icon.svg';

export interface LegendEntryProps {
  activity: ActivityData;
  selectedActivity: string;
  color: string;
  areaId: string;
  totalAreaBudget: number;
}

export const ActivityLegendEntry = (props: LegendEntryProps) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme, ...props });

  const { activity, selectedActivity, color, areaId, totalAreaBudget } = props;

  const isSelected = isMatchingActivity(activity.activity, selectedActivity);
  return (
    <Link
      to={`/priority-area/${areaId}/${hashActivity(activity.activity)}`}
      className={`${classes.activityEntry} ${ isSelected? classes.selectedActivity : '' }`}
      replace={true}
    >
      <div className={classes.activityTitle}>
        <div
          className={classes.activityLogo}
          style={{
            backgroundColor: color,
          }}
        />
        <span><span className={classes.activityExpenditureLink}>
          {activity.activity}
        </span>
        <SeeChartIcon className={classes.seeChartIcon}/>
        </span>
      </div>
      <div className={classes.areaStats}>
        <span className={classes.areaPercentage}>
          {(
            (activity.nationalBudget + activity.externalBudget) * 100 / totalAreaBudget
            )
            .toPrecision(2)
          }% -
        </span>
        <NumberFormat
          value={activity.nationalBudget + activity.externalBudget}
              thousandSeparator={true}
              suffix=" лв."
              displayType="text"
        />
      </div>
      <BudgetSourceBreakdownBarChart areaThemed={true} data={{
        name: activity.activity,
        nationalBudget: activity.nationalBudget,
        euBudget: activity.externalBudget,
      }}/>
    </Link>
  );
}
