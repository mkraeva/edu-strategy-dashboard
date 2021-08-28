import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { PIE_CHART_LAYOUT, smallLogo } from './common.styles';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    dataContainer: {
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
      maxHeight: `${PIE_CHART_LAYOUT.height + 100}px`,
      overflowY: 'auto',

      marginLeft: '50px',
    },
    budgetSourceEntry: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
    },
    budgetSourceLogo: {
      ...smallLogo(30, 30),

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
