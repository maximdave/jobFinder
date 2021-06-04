import React from 'react'
import singleApplication from './SingleApplication.styles';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllApplications } from '../../redux/applySlice';
import { htmlToText } from 'html-to-text'
// import { limitSentence } from '../../utils/utilFunctions';


const SingleApplication = () => {
  const classes = singleApplication();
  const allApplication = useSelector(selectAllApplications);
  const { id } = useParams();

  const currentApplication = allApplication.data.find(data => data._id === id);
  const { name, email, createdAt, coverletter, resume } = currentApplication;

  const text = htmlToText(coverletter)

  const date = new Date(createdAt)

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <div className={classes.nameBox}>
            <p className={classes.applicationHeading}>{name}</p>
            <p className={classes.applicationHeading}>{email}</p>
            {/* <p className={classes.applicationHeading}>21, breave road, New york</p> */}
            <p className={classes.applicationHeading}>Applied on: <span>
              {date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
              </span></p>
            {resume &&
            <a href={`${resume}`}
              target="_blank" rel="noreferrer"
            className={classes.link}>Download applicant's CV</a>}
            {/* <Link to="/userProfile/applicantID" className={classes.link} >View applicant's Profile</Link> */}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.cover}>
            <h2 className={classes.coverTitle}>Cover Letter</h2>
            <p className={classes.letter}>
              {text}
            </p>
          </div>
        </Grid>

      </Grid>
      <div>

      </div>
    </div>
  )
}

export default SingleApplication
