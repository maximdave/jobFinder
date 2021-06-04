import { makeStyles } from '@material-ui/core/';

const applicationStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontFamily: 'EB Garamond',
    color: theme.palette.primary.main,
  },
  applicationContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0 50px',

    '@media (max-width: 831px)': {
      padding: '0 20px',
    },

    '@media (max-width: 431px)': {
      padding: '0 10px',
    },
  },
}));

export default applicationStyles;
