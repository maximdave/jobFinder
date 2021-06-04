import React from 'react'
import appStyles from './ApplicationsPage.styles';
import applicationStyles from '../../components/UserApplications/UserApplications.styles';
import ApplicationCard from '../../components/ApplicationCard/ApplicationCard.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorJobs } from '../../redux/jobsSlice';
import { useParams } from 'react-router-dom';
import { getApplicationById, selectAllApplications, selectAllApplicationsErr, selectIsGettingAllApplications } from '../../redux/applySlice';
import { selectUser } from '../../redux/authSlice';
import { useEffect } from 'react';
import Loader from "react-loader-spinner";

const ApplicationsPage = () => {
  const classes = appStyles();
  const containerClass = applicationStyles();
  const authorJobs = useSelector(selectAuthorJobs);
  const dispatch = useDispatch();
  const myApplications = useSelector(selectAllApplications);
  const isGettingApplications = useSelector(selectIsGettingAllApplications)
  const err = useSelector(selectAllApplicationsErr)
  const user = useSelector(selectUser)
  const { id } = useParams();

  useEffect(() => {
    dispatch(getApplicationById({id, token: user.token, type: 'job'}))
  }, [dispatch, user, id])

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>{
        authorJobs && authorJobs.find(job => job._id === id).title
      }</h1>
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
      <div className={containerClass.applicationContainer}>
        {myApplications &&
          myApplications.data.map(data => <ApplicationCard key={data._id} data={data} />)
        }
      </div>
      { myApplications  && !myApplications.data.length &&
      <div className={classes.applicationContainer}>
         <h2>No Applications yet</h2>
      </div>}

      { err &&
      <div className={classes.applicationContainer}>
         <h2>An Error occurred</h2>
      </div>}
    </div>
  )
}

export default ApplicationsPage;
