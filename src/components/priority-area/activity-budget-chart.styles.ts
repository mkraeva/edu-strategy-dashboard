import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { PIE_CHART_LAYOUT, smallLogo } from './common.styles';

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
    activityEntry: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
      padding: '15px',
    },
    selectedActivity: {
      backgroundColor: '#F9F9F9',
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
    areaStats: {
      marginTop: '15px',
      marginBottom: '10px',
    },
    areaPercentage: {
      padding: '0 3px 3px',
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
