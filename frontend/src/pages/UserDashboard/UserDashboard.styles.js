import { makeStyles } from '@material-ui/core/';

const dashboardStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(250.05deg, #F5F7FA 1.71%, #F4FFF8 95.17%)',
    minHeight: '100vh',
  },
  appBarStyles: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    backgroundColor: '#FFFFFF',
    // position: 'relative',
  },
  toolbarStyles: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 5vw',

    '@media (max-width: 400px)': {
      padding: '10px 3vw',
    },
  },
  logoContainer: {
    marginRight: 'auto',
  },
  logo: {
    width: '150px',

    '@media (max-width: 686px)': {
      width: '100px',
    },
    '@media (max-width: 400px)': {
      width: '80px',
    },
  },
  navList: {
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  navBtn: {
    marginLeft: 30,

    '@media (max-width:490px)': {
      marginLeft: 20,
      fontSize: '8px',
    },
  },
  navTxt: {
    fontSize: 18,
    color: theme.palette.primary.main,
    margin: 0,

    '@media (max-width: 686px)': {
      fontSize: 16,
    },

    '@media (max-width:490px)': {
      fontSize: 14,
    },

    '@media (max-width:428px)': {
      fontSize: '10px',
    },
  },
  navIcon: {
    fontSize: 16,
    marginRight: 10,

    '@media (max-width:428px)': {
      fontSize: 14,
      marginRight: 2,
    },
  },
  iconBtn: {
    marginRight: 20,
  },
  drawer: {
    width: 300,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: 'none',
  },
  drawerOpen: {
    width: 300,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: 'none',
    borderRight: 'none !important',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  swipeableDrawer: {
    width: '40vw',

    '@media (max-width: 696px)': {
      width: '50vw',
    },

    '@media (max-width: 498px)': {
      width: '60vw',
    },

    '@media (max-width: 398px)': {
      width: '70vw',
    },
  },
  mainContent: {
    transition: 'all .2s ease',
    marginRight: 20,
  },
}));

export default dashboardStyles;
