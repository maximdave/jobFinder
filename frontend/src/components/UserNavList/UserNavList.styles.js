import { makeStyles } from '@material-ui/core/';

const userNavListStyles = makeStyles((theme) => ({
  navList: {
    marginTop: '100px',
  },
  listItem: {
    // margin: '0 10px',
    marginBottom: '10px',
    // backgroundColor: 'red'
  },
  listIcon: {
    color: theme.palette.secondary.main,
  },
  listText: {
    fontSize: '15px',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  activeNavLink: {
    background: '#F4FFF8',
    boxShadow: '0px 3px 19px rgba(3, 104, 44, 0.1)',
    borderRadius: '8px',
    color: theme.palette.primary.main,
  },
}));

export default userNavListStyles;
