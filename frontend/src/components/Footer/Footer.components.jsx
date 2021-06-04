import React from 'react'
import footerStyles from './Footer.styles';
import { Link } from 'react-router-dom';
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai';


const Footer = () => {
  const classes = footerStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Job Finder</h2>
      <ul className={classes.navList}>
        <Link className={classes.navItem} to="/">
          {/* <FindReplaceIcon className={classes.navIcon} /> */}
          <p className={classes.navTxt}>Find Jobs</p>
        </Link>
        <Link className={classes.navItem} to="/">
          {/* <PanoramaVerticalIcon className={classes.navIcon} /> */}
          <p className={classes.navTxt}>About</p>
        </Link>
        <Link className={classes.navItem} to="/">
          {/* <TuneIcon className={classes.navIcon} /> */}
          <p className={classes.navTxt}>Contact</p>
        </Link>
      </ul>

      <ul className={classes.navList}>
        <Link className={classes.navItem} to="/">
          <FiFacebook className={classes.navSocialIcon} />
        </Link>
        <Link className={classes.navItem} to="/">
          <FiGithub className={classes.navSocialIcon} />
        </Link>
        <Link className={classes.navItem} to="/">
          <FiTwitter className={classes.navSocialIcon} />
        </Link>
        <Link className={classes.navItem} to="/">
          <AiOutlineInstagram className={classes.navSocialIcon} />
        </Link>
      </ul>

      <div className={classes.contact}>
        <p className={classes.contactMail}>jobfinder@decagon.dev</p>
        <p className={classes.contactPhone}>08188465246</p>
      </div>
      {/* <Link to="/userDashboard" style={{color: '#ffffff'}}>User Dashboard</Link>
      <Link to="/dashboard" style={{color: '#ffffff'}}>employer's Dashboard</Link>
      <Link to="/search/frontend" style={{color: '#ffffff'}}>search results Page</Link> */}
    </div>
  )
}

export default Footer
