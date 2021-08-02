import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    budgetSourceContainer: {
      display: 'flex',
      flexDirection: 'row',

      marginTop: '50px',
    },
    budgetSourceLegend: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '480px',
      overflowY: 'auto',
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
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;