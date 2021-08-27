import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../../themes';
import { PIE_CHART_LAYOUT, smallLogo } from '../common.styles';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    activityBudgetContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    activityBudgetChartContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    activityBudgetLegendContainer: {
      display: 'flex',
      flexDirection: 'column',

      marginLeft: '50px',
    },
    activityBudgetLegendList: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: `${PIE_CHART_LAYOUT.height}px`,
      overflowY: 'auto',
    },
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
