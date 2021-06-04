import { makeStyles } from '@material-ui/core';
import heroImg from '../../assets/ppp.jpg';

const footerStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60.1vh',
    backgroundImage: `linear-gradient(rgba(10, 9, 9, 0.836), rgba(24, 15, 15, 0.932)),url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'EB Garamond',
    color: '#ffffff',
  },

  title: {
    fontSize: 38,
    margin: 0,
    textAlign: 'center',
    marginLeft: 35,

    '@media (max-width: 961px)': {
      fontSize: '30px',
    },
  },

  navList: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    textDecoration: 'none',
  },

  navItem: {
    fontSize: 18,
    color: '#ffffff',
    textDecoration: 'none',

    '&:not(:last-child)': {
      marginRight: '20px',
    },

    '&:hover': {
      textDecoration: 'underline',
    },

    '@media (max-width: 961px)': {
      fontSize: 16,
    },
  },

  navSocialIcon: {
    fontSize: 30,
    marginRight: '20px',
    marginTop: 20,

    '@media (max-width: 961px)': {
      fontSize: 20,
    },
  },

  contact: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    textDecoration: 'underline',

    '@media (max-width: 961px)': {
      fontSize: 20,
    },

    '@media (max-width: 441px)': {
      fontSize: 14,
    },
  },

  contactMail: {
    marginRight: 80,

    '@media (max-width: 441px)': {
      marginRight: 30,
    },
  },
}));

export default footerStyles;
