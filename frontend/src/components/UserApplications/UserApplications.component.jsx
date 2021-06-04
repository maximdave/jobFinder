import React from 'react';
// import Featured from '../Featured/Featured.components'
import applicationStyles from './UserApplications.styles';
import JobApplications from '../JobApplications/JobApplications.component';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationById, selectAllApplications, selectAllApplicationsErr, selectIsGettingAllApplications } from '../../redux/applySlice';
import { selectUser } from '../../redux/authSlice';
import { useEffect } from 'react';
import Loader from "react-loader-spinner";
import { reverseArray } from '../../utils/utilFunctions';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';


const UserApplications = () => {
  const classes = applicationStyles();
  const dispatch = useDispatch();
  const myApplications = useSelector(selectAllApplications);
  const err = useSelector(selectAllApplicationsErr);
  const isGettingApplications = useSelector(selectIsGettingAllApplications)
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(getApplicationById({id: user.user._id, token: user.token, type: 'user'}))
    }
  }, [dispatch, user])

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    >
      <h2 className={classes.title}>My Applications</h2>
      {
        isGettingApplications &&
        <div style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
          <div >
            <Loader
              type="Oval"
              color="#E94368"
              height={60}
              width={60}
            />
          </div>
        </div>
      }
      { myApplications &&
      <div className={classes.applicationContainer}>
        {reverseArray(myApplications.data).map(data => <JobApplications data={data} />)}
         {/* <JobApplications />
        <JobApplications />
        <JobApplications />
        <JobApplications /> */}
      </div>}

      { myApplications  && !myApplications.data.length &&
      <div className={classes.applicationContainer}>
         <h2>No Applications yet</h2>
      </div>}

      { err &&
      <div className={classes.applicationContainer}>
         <h2>An Error occurred</h2>
      </div>}
    </motion.div>
  )
}

export default UserApplications;
