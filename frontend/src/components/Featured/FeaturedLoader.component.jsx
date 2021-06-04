import featuredStyles from './Featured.styles';
import Skeleton from '@material-ui/lab/Skeleton';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';


import React from 'react'

const FeaturedLoader = () => {
  const classes = featuredStyles();
  return (
    <div className={classes.root}>
      <div className={classes.loaderTop}>
        <Skeleton  variant="text" />
        {/* <hr /> */}
        <Skeleton variant="text" className={classes.loaderSmall} />
      </div>
      <div className={classes.loaderIcon}>
        <Skeleton  variant="text" />
        <Skeleton  variant="text" />
      </div>
      <div className={classes.loaderTxt} style={{marginTop: 15}}>
        <Skeleton  variant="text" style={{height: 9}} />
        <Skeleton  variant="text" style={{height: 9, width: '40%'}} />
      </div>
      <div className={classes.loaderTop} style={{marginTop:10}}>
        <Skeleton variant="text" style={{height: 10, width: 40}}/>
        <Skeleton variant="text" style={{height: 10, width: 60, marginLeft: 'auto'}}/>
      </div>
    </div>
  )
}

export default FeaturedLoader
