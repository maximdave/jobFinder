import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import sidebarStyles from './Sidebar.styles';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import PanoramaVerticalIcon from '@material-ui/icons/PanoramaVertical';
import TuneIcon from '@material-ui/icons/Tune';

const Sidebar = () => {
  const classes = sidebarStyles();
  return (
    <div className={classes.root}>
      <Link to="/" className={classes.logoBox} >
        <img src={logo} className={classes.logo} alt="nav logo" />
      </Link>
      <hr style={{width: '95%'}} />
      <ul className={classes.navList}>
        <NavLink to="/" className={classes.navLink}>
          <FindReplaceIcon className={classes.navIcon} color="primary" />
          <p className={classes.txt}>Find Jobs</p>
        </NavLink>
        <NavLink to="/" className={classes.navLink}>
          <PanoramaVerticalIcon className={classes.navIcon} color="primary" />
          <p className={classes.txt}>About</p>
        </NavLink>
        <NavLink to="/" className={classes.navLink}>
          <TuneIcon className={classes.navIcon} color="primary" />
          <p className={classes.txt}>Contact</p>
        </NavLink>
      </ul>
    </div>
  )
}

export default Sidebar
