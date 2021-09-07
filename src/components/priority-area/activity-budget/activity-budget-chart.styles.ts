import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../../themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    activityBudgetContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    activityBudgetChartContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    activityBudgetLegendContainer: {
      display: 'flex',
      flexDirection: 'column',

      marginLeft: '50px',
    },
    activityBudgetLegendList: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '600px',
      overflowY: 'auto',

      boxShadow: '0px 15px 15px -5px #eeeeee',
    },
    '@media screen and (max-width: 480px)': {
      activityBudgetContainer: {
        flexDirection: 'column',
      },
      activityBudgetLegendContainer: {
        marginLeft: 0,
        marginBottom: '3em',
      },
    },
  };

  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
