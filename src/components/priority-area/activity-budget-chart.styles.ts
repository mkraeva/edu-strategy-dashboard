import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { CHART_HEIGHT, smallLogo } from './common.styles';

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
      maxHeight: `${CHART_HEIGHT}px`,
      overflowY: 'auto',
    },
    activityEntry: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
    },
    activityTitle: {
      display: 'flex',
      flexDirection: 'row',
    },
    activityLogo: {
      ...smallLogo(30, 30),

      marginRight: '16px',
    },
    activityExpenditureLink: {
      color: 'black !important',
      fontWeight: 'bold',
      textDecoration: 'underline !important',
    },
  };  
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
