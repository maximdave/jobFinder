import React, { useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Switch, useRouteMatch, useLocation, Route, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import logo from '../../assets/logo.png';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import UserNavList from '../../components/UserNavList/UserNavList.component';
import UserProfile from '../../components/UserProfile/UserProfile.component';
import UserSidebar from '../../components/UserSidebar/UserSidebar.component';
import dashboardStyles from '../UserDashboard/UserDashboard.styles';
import PostJob from '../../components/PostJob/PostJob.component';
import AllEmployerJobs from '../AllEmployerJobs/AllEmployerJobs.component';
import UpdateJob from '../UpdateJob/UpdateJob.component';
import ApplicationsPage from '../ApplicationsPage/ApplicationsPage.components';
import SingleApplication from '../SingleApplication/SingleApplication.component';
import ManageUsers from '../ManageUsers/ManageUsers.component';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../../redux/authSlice';
import { AnimatePresence, motion } from 'framer-motion';

const EmployerDashboard = () => {
  let { path } = useRouteMatch();
  const classes = dashboardStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      history.push('/login')
    } else if (user.user.role === 'applicant') {
      history.push('/userDashboard')
    }
  }, [user, history]);

  const [open, setOpen] = React.useState(true);

  const [openTemporaryDrawer, setOpenTemporaryDrawer] = React.useState(false);

  const handleTemporaryDrawer = () => {
    setOpenTemporaryDrawer(true);
  }

  const handleDrawer = () => {
    setOpen(!open);
  };

  let marginOpen = '340px';
  let marginClosed = '120px';

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  if (matchesSm) {
    marginOpen = '3vw';
    marginClosed = '3vw';
  }
  return (
    <motion.div>
    <CssBaseline />
    <AppBar position="sticky" className={classes.appBarStyles}>
    <SwipeableDrawer variant="temporary"
        open={openTemporaryDrawer}
        onClose={() => setOpenTemporaryDrawer(false)}
        onOpen={() => setOpenTemporaryDrawer(true)}
        classes={{ paper: classes.swipeableDrawer }}
    >
      <UserSidebar employer admin={user && user.user.role === 'admin' ? true : false}
      closeSidebar={() => setOpenTemporaryDrawer(false)} temporarySidebar={true} />
    </SwipeableDrawer>
      <Toolbar className={classes.toolbarStyles}>
        <Hidden smDown>
          <IconButton
            className={classes.iconBtn}
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
          >
          <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.iconBtn}
            color="primary"
            aria-label="open drawer"
            onClick={handleTemporaryDrawer}
            edge="start"
          >
          <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </Hidden>
        <Link className={classes.logoContainer} to="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>

        <ul className={classes.navList}>
          <div className={classes.navItem} to="/">
              {/* <FindReplaceIcon className={classes.navIcon} color="secondary" /> */}
              <p className={classes.navTxt}>Hello, {user && user.user.name.split(' ')[0]}</p>
          </div>
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            className={classes.navBtn}
            onClick={() => dispatch(logout())}
          >
            Sign out
          </Button>
        </ul>
      </Toolbar>
    </AppBar>
    <Hidden smDown>
      <Drawer variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <UserNavList employer admin={user && user.user.role === 'admin' ? true : false} />
      </Drawer>
    </Hidden>
    <main className={classes.mainContent} style={{ marginLeft: open ? marginOpen : marginClosed }}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path={path} component={PostJob} />
          <Route path={`${path}/myJobs`} component={AllEmployerJobs} />
          <Route path={`${path}/profile`} component={UserProfile} />
          <Route path={`${path}/users`} component={ManageUsers} />
          <Route path={`${path}/update/:id`} component={UpdateJob} />
          <Route path={`${path}/applications/:id`} component={ApplicationsPage} />
          <Route path={`${path}/application/:id`} component={SingleApplication} />
        </Switch>
      </AnimatePresence>
    </main>
  </motion.div>
)
}

export default EmployerDashboard
