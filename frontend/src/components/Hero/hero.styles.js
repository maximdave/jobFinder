import { makeStyles } from '@material-ui/core/';
import heroImg from '../../assets/hero.jpg';

const heroStyles = makeStyles((theme) => ({
  root: {
    minHeight: '92vh',
    backgroundImage: `linear-gradient(rgba(14, 5, 5, 0.719), rgba(24, 15, 15, 0.932)),url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '60px',
    color: '#ffffff',
    fontWeight: 600,
    lineHeight: '70px',
    textTransform: 'capitalize',

    '@media (max-width: 938px)': {
      fontSize: '40px',
      lineHeight: '50px',
    },

    '@media (max-width: 680px)': {
      fontSize: '30px',
      lineHeight: '40px',
    },

    '@media (max-width: 496px)': {
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
  container: {
    marginLeft: '10vw',

    '@media (max-width: 496px)': {
      marginLeft: '5vw',
    },
  },
  search: {
    width: '35vw',
    marginRight: '20px',
    fontSize: '24px',
    padding: '10px 10px',
    border: 'none',
    marginBottom: '20px',
    // border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '15px',

    '&::placeholder': {
      fontSize: 15,
      color: '#AEBEC7',

      '@media (max-width: 794px)': {
        fontSize: 16,
      },

      '@media (max-width: 496px)': {
        fontSize: 13,
      },
    },

    '@media (max-width: 938px)': {
      fontSize: '20px',
      width: '45vw',
    },

    '@media (max-width: 794px)': {
      fontSize: '20px',
      width: '50vw',
      padding: '12px 10px',
    },

    '@media (max-width: 680px)': {
      fontSize: '18px',
      // width: '50vw',
      padding: '10px 10px',
    },

    '@media (max-width: 496px)': {
      fontSize: '16px',
      width: '55vw',
      padding: '10px 10px',
    },

    '@media (max-width: 374px)': {
      fontSize: '16px',
      width: '70vw',
      padding: '10px 10px',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchBtn: {
    width: '20%',
    marginTop: '20px',
    padding: '10px 1px',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '15px',
    height: '50px',

    '@media (max-width: 938px)': {
      fontSize: '16px',
      width: '30%',
      padding: '8px 10px',
    },

    '@media (max-width: 680px)': {
      fontSize: '14px',
      width: '30%',
      padding: '5px 10px',
    },
  },
}));

export default heroStyles;
