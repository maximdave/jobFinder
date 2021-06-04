import React from 'react'
import Navbar from '../../components/NavBar/Navbar.component';
import Footer from '../../components/Footer/Footer.components';
import profileStyles from './UserProfilePage.styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const UserProfilePage = () => {
  const classes = profileStyles();
  return (
    <div>
      <Navbar />
      <div className={classes.profile}>
        <div className={classes.profileBox}>
          <div className={classes.photoBox}>
            <AccountCircleOutlinedIcon className={classes.photoIcon} />
          </div>
          <p className={classes.userName}>Olumorin Samuel</p>
          <p className={classes.mail}>olumorinsammy@gmail.com</p>
          <div className={classes.bio}>
            <h2 className={classes.heading}>BIO</h2>
            <p className={classes.txt}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo.
            </p>
          </div>
          <div className={classes.bio}>
            <h2 className={classes.heading}>Address</h2>
            <p className={classes.txt}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfilePage
