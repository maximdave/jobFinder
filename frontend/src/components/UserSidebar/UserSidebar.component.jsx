import React from 'react';
import logo from '../../assets/logo.png'
import useSideBarStyles from './UserSidebar.styles';
import EmojiNatureOutlinedIcon from '@material-ui/icons/EmojiNatureOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/EmojiNatureOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import userNavListStyles from '../UserNavList/UserNavList.styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



const UserSidebar = ({ temporarySidebar, closeSidebar, employer, admin, user }) => {
  const classes = useSideBarStyles();
  const navListStyles = userNavListStyles();

  const handleCloseSidebar = () => {
    if(temporarySidebar) {
      closeSidebar()
    }
  }

  const navLinks = [
    {
      icon: <EmojiNatureOutlinedIcon />,
      text: 'My Applications',
      route: '/userDashboard'
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      text: 'Profile',
      route: '/userDashboard/profile'
    },
    {
      icon: <CloudUploadIcon />,
      text: 'Upload Resume',
      route: '/userDashboard/upload'
    },
  ]

  const employerLinks = [
    {
      icon: <AddBoxIcon />,
      text: 'New Job',
      route: '/dashboard'
    },
    {
      icon: <AllInclusiveIcon />,
      text: 'Jobs',
      route: '/dashboard/myJobs'
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      text: 'Profile',
      route: '/dashboard/profile'
    },
  ];

  const userLink = {
    icon: <PeopleAltOutlinedIcon />,
    text: 'Users',
    route: '/dashboard/users'
  };

  if (admin) {
    employerLinks.splice(2, 0, userLink);
  }

  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <img className={classes.logo} src={logo} alt="" />
      </div>
      <hr />
      <List className={classes.navList} style={{}}>
        {user && navLinks.map(listItem =>
          <ListItem button className={navListStyles.listItem} component={NavLink} to={listItem.route}
            activeClassName={navListStyles.activeNavLink} exact={true} key={listItem.text}
            onClick={handleCloseSidebar}
            >
              <ListItemIcon className={navListStyles.listIcon}> {listItem.icon} </ListItemIcon>
              <ListItemText primary={listItem.text} className={navListStyles.listText}
                classes= {{ primary: navListStyles.listText }}
              />
          </ListItem>
        )}
      </List>
      <List className={classes.navList} style={{}}>
        {employer && employerLinks.map(listItem =>
          <ListItem button className={navListStyles.listItem} component={NavLink} to={listItem.route}
            activeClassName={navListStyles.activeNavLink} exact={true} key={listItem.text}
            onClick={handleCloseSidebar}
            >
              <ListItemIcon className={navListStyles.listIcon}> {listItem.icon} </ListItemIcon>
              <ListItemText primary={listItem.text} className={navListStyles.listText}
                classes= {{ primary: navListStyles.listText }}
              />
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default UserSidebar
