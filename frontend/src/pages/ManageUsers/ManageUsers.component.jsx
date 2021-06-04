import React, { useEffect } from 'react';
import manageUsersStyles from './ManageUsers.styles';
// import clsx from 'clsx';
import UserTable from '../../components/UserTable/UserTable.component';
// import funnelIcon from '../../assets/icons/funnel-icon.png';
// import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, selectAllUsers, selectIsGettingAllUsers } from '../../redux/userslice';
import { selectUser } from '../../redux/authSlice';
import Loader from "react-loader-spinner";

const ManageUsers = () => {
  const classes = manageUsersStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const allUsers = useSelector(selectAllUsers);
  const isGettingUsers = useSelector(selectIsGettingAllUsers)

  useEffect(() => {
    if (user) {
      dispatch(getAllUsers(user.token))
    }
    // console.log(allUsers)
  }, [dispatch, user])


  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <h2 className={classes.tableHeading}>Manage users</h2>
      </div>
      {
        isGettingUsers && !allUsers &&
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
      {allUsers && allUsers.data &&
      <UserTable allUsers={allUsers.data} />}
    </div>
  )
}

export default ManageUsers
