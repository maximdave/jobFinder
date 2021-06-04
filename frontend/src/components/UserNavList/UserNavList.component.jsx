import React from 'react'
import userNavListStyles from './UserNavList.styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import List from '@material-ui/core/List';
import EmojiNatureOutlinedIcon from '@material-ui/icons/EmojiNatureOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { NavLink } from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const UserNavList = ({ employer, admin, user  }) => {
  const classes = userNavListStyles();


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
  }

  if (admin) {
    employerLinks.splice(2, 0, userLink);
  }

  return (
    <List className={classes.navList} style={{}}>
      {user && navLinks.map(listItem =>
        <ListItem button className={classes.listItem} component={NavLink} to={listItem.route}
          activeClassName={classes.activeNavLink} exact={true} key={listItem.text}
          // onClick={handleCloseSidebar}
          >
            <ListItemIcon className={classes.listIcon}> {listItem.icon} </ListItemIcon>
            <ListItemText primary={listItem.text} className={classes.listText}
              classes= {{ primary: classes.listText }}
            />
        </ListItem>
        ) }

        {employer && employerLinks.map(listItem =>
          <ListItem button className={classes.listItem} component={NavLink} to={listItem.route}
            activeClassName={classes.activeNavLink} exact={true} key={listItem.text}
            // onClick={handleCloseSidebar}
            >
              <ListItemIcon className={classes.listIcon}> {listItem.icon} </ListItemIcon>
              <ListItemText primary={listItem.text} className={classes.listText}
                classes= {{ primary: classes.listText }}
              />
          </ListItem>
        ) }
    </List>
  )
}

export default UserNavList
