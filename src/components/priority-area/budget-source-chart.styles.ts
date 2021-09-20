import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { smallLogo } from './common.styles';

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
      flexGrow: 1,
    },
    budgetSourceLegend: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '600px',
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
    euProgram: {
      margin: '1em',
    },
    budgetSourceEuProgramLogo: {
      ...smallLogo(10, 10),
      // display: 'inline-block',
      float: 'left',
      marginTop: '0.4em',
    },
    totalSum: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '2em',
    },
    '@media screen and (max-width: 480px)': {
      budgetSourceLegend: {
        maxHeight: '400px',
        margin: '40px 0 40px 20px',
      },
      dataContainer: {
        flexDirection: 'column',
      },
    },
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
