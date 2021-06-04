import React from 'react';
import jobAppStyles from '../JobApplications/JobApplications.styles';
import { Link } from 'react-router-dom';
import { GiLoveLetter } from 'react-icons/gi';
import { htmlToText } from 'html-to-text'
import { limitSentence } from '../../utils/utilFunctions';



const ApplicationCard = ({ data }) => {
  const { name, email, coverletter, createdAt, _id } = data
  const classes = jobAppStyles();
  const text = htmlToText(coverletter)
  const date = new Date(createdAt)
  return (
    <Link to={`/dashboard/application/${_id}`} className={classes.root}>
      <div className={classes.wrapper} >
        <div className={classes.top}>
          <h2 className={classes.title}>{name}</h2>
          <div className={classes.location}>
            <p className={classes.locationEmail}>{email}</p>
          </div>
        </div>
        <div className={classes.cover}>
          <GiLoveLetter className={classes.coverIcon} />
          <h6 className={classes.coverTitle}>Cover</h6>
        </div>
        <p className={classes.coverTxt}>
          {limitSentence(text)}
        </p>
        <div className={classes.date}>
          <div className={classes.postedBox}>
            <p className={classes.dateTitle}>
              Application Date:
            </p>
            <p className={classes.dateDate}>
              {date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ApplicationCard
