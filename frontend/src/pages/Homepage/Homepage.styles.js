import { makeStyles } from '@material-ui/core/';

const homepageStyles = makeStyles((theme) => ({
  featuredSection: {
    padding: '80px 0',
  },
  featuredHeading: {
    fontFamily: 'EB Garamond',
    textAlign: 'center',
    fontSize: '45px',
    color: theme.palette.secondary.main,

    '@media (max-width: 484px)': {
      fontSize: 18,
    },
  },
  categories: {
    marginBottom: 100,
  },
  categoryContainer: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '10px 10vw',

    '@media (max-width: 991px)': {
      padding: '10px 5vw',
    },

    '@media (max-width: 647px)': {
      justifyContent: 'space-around',
    },
  },
  categoryBox: {
    width: '22%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(221, 221, 233, 0.301)',
    borderRadius: '20px',

    '&:hover': {
      boxShadow: '1px 1px 15px 0px rgba(0,0,0,0.20)',
    },
    '&:hover $categoryBtn': {
      opacity: 1,
      visibility: 'visible',
    },

    '@media (max-width: 991px)': {
      width: '30%',
      marginBottom: 10,
    },

    '@media (max-width: 647px)': {
      width: '43%',
    },

    '@media (max-width: 415px)': {
      width: '65%',
      marginBottom: 20,
    },
  },
  categoryIcon: {
    fontSize: 70,
    color: theme.palette.primary.main,

    '@media (max-width: 647px)': {
      fontSize: 40,
    },
  },
  categoryTitle: {
    fontSize: 20,
    margin: '5px 0px',

    '@media (max-width: 484px)': {
      fontSize: 17,
    },
  },
  categoryDescription: {
    textAlign: 'center',

    '@media (max-width: 484px)': {
      fontSize: 12,
    },
  },
  categoryBtn: {
    fontWeight: 700,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 2000ms ease',
    fontSize: 12,
    fontFamily: 'EB Garamond',

    '@media (max-width: 415px)': {
      opacity: 1,
      visibility: 'visible',
      fontWeight: 600,
      fontSize: 7,
    },
  },
}));

export default homepageStyles;
