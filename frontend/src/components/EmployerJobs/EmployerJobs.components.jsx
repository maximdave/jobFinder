import React from 'react'
import jobAppStyles from '../JobApplications/JobApplications.styles';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ViewListIcon from '@material-ui/icons/ViewList';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, selectIsDeletingJobs } from '../../redux/jobsSlice';
import { selectUser } from '../../redux/authSlice';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const EmployerJobs = ({ job }) => {
  const classes = jobAppStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { title, companyName, location, createdAt, _id, noOfApplications } = job;
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const isDeleting = useSelector(selectIsDeletingJobs);


  const date = new Date(createdAt)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete =() => {
    // handleClose();
    dispatch(deleteJob({id: _id, token: user.token}))
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper} >
        <div className={classes.top}>
          <h2 className={classes.title}>{title}</h2>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
        <MoreVertIcon />
      </IconButton>
        </div>
        <div className={classes.company}>
          <BusinessOutlinedIcon className={classes.locationIcon} />
          <p className={classes.locationTxt}>{companyName}</p>
        </div>
        <div className={classes.ApplicantsBox}>
          <p className={classes.dateTitle}>
            Applications: <span className={classes.number}>{noOfApplications}</span>
          </p>
        </div>
        <div className={classes.date}>
          <div className={classes.postedBox}>
            <p className={classes.dateTitle}>
              Date Posted:
            </p>
            <p className={classes.dateDate}>
              {date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
            </p>
          </div>
            <div className={classes.location}>
              <LocationOnOutlinedIcon className={classes.locationIcon} />
              <p className={classes.locationTxt}>{location}</p>
            </div>
        </div>
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
          <MenuItem component={Link} to={`/dashboard/update/${_id}`} onClick={handleClose}>
            <ListItemIcon>
              <UpdateIcon className={classes.menuIcon} fontSize="small" />
            </ListItemIcon>
            <p className={classes.listTxt}>Update</p>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
                <DeleteForeverIcon className={classes.menuIcon} fontSize="small" />
            </ListItemIcon>
            <p className={classes.listTxt}>Delete</p>
          </MenuItem>
          {
          <MenuItem component={Link} to={`/dashboard/applications/${_id}`} onClick={handleClose}>
            <ListItemIcon>
                <ViewListIcon className={classes.menuIcon} fontSize="small" />
            </ListItemIcon>
            <p className={classes.listTxt}>View Applications</p>
          </MenuItem>
          }
      </Menu>
      {isDeleting ? (
          <Backdrop className={classes.backdrop} open={true} style={{zIndex: 9999999}}>
            <CircularProgress className={classes.backdrop} style={{color: '#ffffff'}} />
          </Backdrop>
        ) : (
          ''
        )}
    </div>
  )
}

export default EmployerJobs
