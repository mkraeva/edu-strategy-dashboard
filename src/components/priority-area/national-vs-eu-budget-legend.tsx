import { useTheme } from "react-jss";
import { AreaTheme } from "../../themes";
import { COLORS } from "./common.styles";
import { useStyles } from "./national-vs-eu-budget-legend.styles";

const NationalEUBudgetLegend: React.FC<{includeNationalPrograms?: boolean }> = ({ includeNationalPrograms }) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const legendItems = [
    {
      text: 'Средства от националния бюджет',
      color: theme?.budgetColor || COLORS.nationalBudget,
    },
    {
      text: 'Средства от ЕС и други международни проекти и програми',
      color: theme?.euProgramColor || COLORS.euBudget,
    },
  ];
  if (includeNationalPrograms) {
    legendItems.push({
      text: 'Средства по национални програми',
      color: theme?.nationalProgramColor || COLORS.nationalProgram,
    });
  }
  return (
    <div className={classes.activityBudgetLegend}>
      {legendItems.map(({ text, color }) => (
        <div className={classes.legendIndicationContainer} key={text}>
          <div
            className={classes.legendIndication}
            style={{
              backgroundColor: color,
            }}
          />
          <div className={classes.legendText}>{text}</div>
        </div>
      ))}
    </div>
  );
};

export { NationalEUBudgetLegend };
