import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Sidebar from '../../components/sideBar/Sidebar.component';
// import FindReplaceIcon from '@material-ui/icons/FindReplace';
// import PanoramaVerticalIcon from '@material-ui/icons/PanoramaVertical';
// import TuneIcon from '@material-ui/icons/Tune';
import navbarStyles from './Navbar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../redux/authSlice';


const Navbar = () => {
  const classes = navbarStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
      setOpen(true);
  }

  return (
    <div >
      <AppBar className={classes.root}>
      <SwipeableDrawer variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        classes={{ paper: classes.swipeableDrawer }}
      >
        <Sidebar />
      </SwipeableDrawer>
        <Toolbar className={classes.toolbarStyles}>
          <IconButton className={classes.iconBtn} onClick={() => {handleDrawer()}} >
            <MenuIcon color="primary" className={classes.hamburger} />
          </IconButton>
          <Link to="/" className={classes.logoBox}>
            <img className={classes.img} src={logo} alt="job finder logo" />
          </Link>
          {/* <ul className={classes.navList}>
            <NavLink className={classes.navItem} to="/">
              <FindReplaceIcon className={classes.navIcon} color="secondary" />
              <p className={classes.navTxt}>Find Jobs</p>
            </NavLink>
            <NavLink className={classes.navItem} to="/">
              <PanoramaVerticalIcon className={classes.navIcon} color="secondary" />
              <p className={classes.navTxt}>About</p>
            </NavLink>
            <NavLink className={classes.navItem} to="/">
              <TuneIcon className={classes.navIcon} color="secondary" />
              <p className={classes.navTxt}>Contact</p>
            </NavLink>
          </ul> */}
          {user ?
            <div>
              <Button
                component={Link}
                to={user.user.role === 'applicant' ? '/userDashboard' : '/dashboard'}
                variant="contained"
                color="secondary"
                disableElevation
                className={classes.navBtn}>
                Dashboard
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.navBtn}
                onClick={() => dispatch(logout())}
              >
                Sign Out
              </Button>
            </div>
            :
            <div>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              disableElevation className={classes.navBtn}>
              Register
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="secondary"
              className={classes.navBtn}>
              Login
            </Button>
          </div>
          }
        </Toolbar>
      </AppBar>
        {/* <Toolbar />
        <Toolbar /> */}
        <Toolbar className={classes.nav} />
    </div>
  )
}

export default Navbar
