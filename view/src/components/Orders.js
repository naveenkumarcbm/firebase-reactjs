import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import service from '../util/service';
import Environment from '../environment';
import { useDispatch } from 'react-redux';
import { GET_USER_LIST } from '../store/actions';
import { useSelector, shallowEqual } from 'react-redux';

async function getUserList(dispatch) {
  await service(Environment.USERS_LIST, 'GET')
  .then(data =>dispatch({ type: GET_USER_LIST, payload: data}))
  .catch(err => console.log(err));
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    getUserList(dispatch)
  }, [])

  useSelector(
    ({ application }) => {
      if(application.users.length)
        setUsers(application.users);
    },
    shallowEqual,
  );

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(users? users: []).map((row) => (
            <TableRow key={row.userId}>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.country? row.country : 'IN' }</TableCell>
              <TableCell>{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}