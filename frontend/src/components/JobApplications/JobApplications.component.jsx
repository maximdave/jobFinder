import React from 'react';
import jobAppStyles from './JobApplications.styles';
// import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';

const JobApplications = ({data: { title, location, company, createdAt}}) => {
  const classes = jobAppStyles();
  const date = new Date(createdAt)
  return (
    <div className={classes.root}>
      <div className={classes.wrapper} >
        <div className={classes.top}>
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.location}>
            <LocationOnOutlinedIcon className={classes.locationIcon} />
            <p className={classes.locationTxt}>{location}</p>
          </div>
        </div>
        <div className={classes.company}>
          <BusinessOutlinedIcon className={classes.locationIcon} />
          <p className={classes.locationTxt}>{company}</p>
        </div>
        <div className={classes.date}>
          <div className={classes.postedBox}>
            <p className={classes.dateTitle}>
              Application Date:
            </p>
            <p className={classes.dateDate}>
              {date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
            </p>
          </div>
          {/* <div className={classes.postedBox}>
            <p className={classes.dateTitle}>
              Application Date:
            </p>
            <p className={classes.dateDate}>
              13-May-2021
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default JobApplications
