import { useTheme } from "react-jss";
import { AreaTheme } from "../../themes";
import { COLORS } from "./common.styles";
import { useStyles } from "./national-vs-eu-budget-legend.styles";

const NationalEUBudgetLegend: React.FC<{}> = () => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  return (
    <div className={classes.activityBudgetLegend}>
      <div className={classes.legendIndicationContainer}>
        <div
          className={classes.legendIndication}
          style={{
            backgroundColor: theme?.budgetColor || COLORS.nationalBudget,
          }}
        ></div>
        <div className={classes.legendText}>Средства от националния бюджет</div>
      </div>
      <div className={classes.legendIndicationContainer}>
        <div
          className={classes.legendIndication}
          style={{ backgroundColor: theme?.euProgramColor || COLORS.euBudget }}
        ></div>
        <div className={classes.legendText}>
          Средства от ЕС и други международни проекти и програми
        </div>
      </div>
    </div>
  );
};

export { NationalEUBudgetLegend };
