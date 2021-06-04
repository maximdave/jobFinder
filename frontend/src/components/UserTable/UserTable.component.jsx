import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import tableStyles from './UserTable.styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice';
import { suspendUser } from '../../redux/userslice';



function createData(name, email, role, status, actionIcon ,id, isActive ) {
  return { name, email, role, status, actionIcon, id, isActive  };
}

const UserTable = ({ allUsers }) => {
  const classes = tableStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

 const newRows = allUsers.map(data => {
   let { name, email, role, isActive } = data;
   const id = data._id
  name = `${name}_${id}`
   return createData(name, email, role, isActive === true ? 'active' : 'suspended', id, isActive)
 })

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    className={classes.tableContainer}>
      <Table  aria-label="simple table" className={classes.table} >
        <TableHead>
          <TableRow className={classes.tableHeader}>
            <TableCell className={classes.tableHeading}>Name</TableCell>
            <TableCell className={classes.tableHeading} align="justify">email</TableCell>
            <TableCell className={classes.tableHeading} align="justify">role</TableCell>
            <TableCell className={classes.tableHeading} align="justify">status</TableCell>
            <TableCell className={classes.tableHeading} align="justify"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {newRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={clsx(classes.tableCell, classes.tablePadding,)} component="th" scope="row">
                <div className={classes.dotCell}>
                  {row.name.split('_')[0]}
                </div>
              </TableCell>
              <TableCell className={clsx(classes.tableCell, classes.tablePadding) } align="justify">{row.email}</TableCell>
              <TableCell className={clsx(classes.tableCell, classes.tablePadding) } align="justify">{row.role}</TableCell>
              <TableCell className={clsx(classes.tableCell, classes.tablePadding) } align="justify">{row.status}</TableCell>
              <TableCell className={clsx(classes.tableCellBold, classes.tablePadding)} align="justify">
              <Tooltip title="suspend user" placement="top">
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={() => {dispatch(suspendUser({ id: row.name.split('_')[1], token: user.token }))}}
                >
                  {row.isActive ?  <CheckCircleOutlinedIcon className={tableStyles.deleteIcon} />
                  : <CancelOutlinedIcon className={tableStyles.deleteIcon} />}
                </IconButton>
              </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //   },
        // }}
      >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <RemoveCircleOutlineOutlinedIcon className={classes.menuIcon} fontSize="small" />
            </ListItemIcon>
            <p className={classes.listTxt}>Suspend</p>
          </MenuItem>
          {/* <MenuItem component={Link} to="/userProfile/userId" onClick={handleClose}>
            <ListItemIcon>
                <ViewListOutlinedIcon className={classes.menuIcon} fontSize="small" />
            </ListItemIcon>
            <p className={classes.listTxt}>View Profile</p>
          </MenuItem> */}
        {/* {options.map((option) => (
        ))} */}
      </Menu>
    </motion.div>
  )
}

export default UserTable
