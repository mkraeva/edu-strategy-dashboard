import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { smallLogo } from './common.styles';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    activityBudgetLegend: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',

      marginTop: '20px',
    },
    legendIndicationContainer: {
      paddingRight: 10
    },
    legendIndication: {
      ...smallLogo(32, 6),
    },
    legendText: {
      fontSize: '0.9em',
    },
  };  
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
