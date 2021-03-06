import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    priorityArea: {
      display: 'flex',
      flexDirection: 'column',
      '&>div': {
        marginTop: '2em',
      }
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      marginBottom: '50px',
    },
    headerTitle: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.textColor,
    },
    headerAreaName: {
      fontSize: '2em',
      fontWeight: 'bold',
    },
    areaLogo: {
      width: '100px',
      height: '100px',
      marginRight: '32px',
    },

    progressBarContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    progressBarLabel: {
      marginBottom: '10px',
    },
    progressBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',

      padding: '5px',

      borderStyle: 'solid',
      borderColor: theme.primaryColor,
      borderWidth: '1px',
      boxShadow: '0px 10px 12px #00000029',

      fontWeight: 'bold',
    },
    '@media screen and (max-width: 480px)': {
      areaLogo: {
        width: '70px',
        height: '70px',
      },
      headerAreaName: {
        fontSize: '1.5em',
      },
      header: {
        marginBottom: 0,
      },
      mainContainer: {
        marginTop: 0,
      },
    },
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
