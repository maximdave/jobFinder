import React from 'react'
import featuredStyles from './Featured.styles';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { Link } from 'react-router-dom';
import { limitSentence } from '../../utils/utilFunctions';

const Featured = ({ featured }) => {
  const classes = featuredStyles();
  const { title, companyName, description, createdAt, _id, location } = featured;
  const date = new Date(createdAt)
  return (
    <div className={classes.root} >
      <div className={classes.featureTop}>
        <h2 className={classes.jobTitle}>{title}</h2>
        <div className={classes.location}>
          <LocationOnOutlinedIcon className={classes.locationIcon} />
          <p className={classes.locationTxt}>{location}</p>
        </div>
      </div>
      <div className={classes.company}>
        <BusinessOutlinedIcon className={classes.companyIcon}/>
        <p className={classes.companyText}>{companyName}</p>
      </div>
      <div className={classes.jobDescription}>
        {/* <DescriptionOutlinedIcon className={classes.descriptionIcon} /> */}
        <p className={classes.descriptionText}>
          {limitSentence(description)}
        </p>
      </div>
      <div className={classes.footer}>
        <p className={classes.days}>
          {date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
        </p>
        <Link to={`/description/${_id}`} className={classes.more}>More...</Link>
      </div>
    </div>
  )
}

export default Featured
