import { makeStyles } from '@material-ui/core/';

const navbarStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    backgroundColor: '#ffffff',

    boxShadow: 'none',
  },
  toolbarStyles: {
    padding: '8px 50px',
    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 866px)': {
      padding: '8px 30px',
    },
    '@media (max-width: 399px)': {
      padding: '8px 20px 8px 7px',
    },
  },
  iconBtn: {
    marginRight: '7px',
    display: 'none',

    '@media (max-width: 657px)': {
      display: 'block',
    },
  },
  hamburger: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  logoBox: {
    marginRight: 'auto',
  },
  img: {
    width: '150px',

    '@media (max-width: 866px)': {
      width: '150px',
    },

    '@media (max-width: 722px)': {
      width: '120px',
    },

    '@media (max-width: 500px)': {
      width: '100px',
    },
  },
  navList: {
    marginRight: '45px',
    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 866px)': {
      marginRight: '20px',
    },

    '@media (max-width: 657px)': {
      display: 'none',
    },
  },
  navItem: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: '20px',
    fontWeight: 600,
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      textDecoration: 'underline',
    },

    '@media (max-width: 722px)': {
      width: '120px',
      marginRight: '10px',
      fontSize: '15px',
    },
  },
  navIcon: {
    marginRight: 5,
    fontSize: 16,
  },
  navTxt: {
    margin: 0,
    '@media (max-width: 1138px)': {
      fontSize: '13px',
    },
  },
  navBtn: {
    padding: '10px 30px',
    fontWeight: 800,

    '&:not(:last-child)': {
      marginRight: 40,

      '@media (max-width: 974px)': {
        marginRight: 10,
      },
    },

    '@media (max-width: 974px)': {
      padding: '6px 20px',
    },

    '@media (max-width: 483px)': {
      padding: '3px 14px',
      fontWeight: 500,
      fontSize: '10px',
    },
  },
  swipeableDrawer: {
    width: '30%',
    backgroundColor: '#ffffff',

    '@media (max-width: 636px)': {
      width: '35%',
    },

    '@media (max-width: 536px)': {
      width: '55%',
    },

    '@media (max-width: 443px)': {
      width: '65%',
    },

    '@media (max-width: 376px)': {
      width: '70%',
    },

    '@media (max-width: 333px)': {
      width: '80%',
    },
  },
  nav: {
    // marginTop: '-1px',

    // '@media (max-width: 1138px)': {
    //   marginTop: '-47px',
    // },
    // '@media (max-width: 864px)': {
    //   marginTop: '-53px',
    // },
    // '@media (max-width: 756px)': {
    //   marginTop: '-35px',
    // },
    // '@media (max-width: 720px)': {
    //   marginTop: '-53px',
    // },
    // '@media (max-width: 650px)': {
    //   marginTop: '-77px',
    // },
    // '@media (max-width: 594px)': {
    //   marginTop: '-45px',
    // },
    // '@media (max-width: 504px)': {
    //   marginTop: '-61px',
    // },
  },
}));

export default navbarStyles;
