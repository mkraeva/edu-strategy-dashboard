import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from './themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    areaLegendEntry: {
      margin: '24px',
      maxWidth: '450px',

      display: 'flex',
      flexDirection: 'row',
    },
    areaLogo: {
      width: '70px',
      height: '70px',
      marginRight: '32px',
    },
    areaData: {

    },
    areaStats: {
      marginTop: '15px',
      marginBottom: '10px',
    },
    areaName: {
      fontWeight: 'bold',
    },
    seeMore: {
      color: 'white',
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
      boxShadow: '0px 10px 12px #00000029',
      borderRadius: '4px',
      opacity: 1,

      padding: '9px 18px',
      fontWeight: 'bold',
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;