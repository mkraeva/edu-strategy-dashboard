import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';

export const CHART_HEIGHT = 480;
export const CHART_WIDTH = 460;
export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    budgetSourceContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    budgetSourceChartContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    budgetSourceLegend: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: `${CHART_HEIGHT}px`,
      overflowY: 'auto',

      marginLeft: '50px',
    },
    budgetSourceEntry: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
    },
    budgetSourceLogo: {
      flexShrink: 0,
      flexGrow: 0,
      width: '30px',
      height: '30px',

      marginRight: '16px',
    },
    budgetSourceDescription: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '20px',
    },
    budgetSourceName: {
      fontWeight: 'bold',
    },
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
