import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Main from './pages/Main';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();
  const { showSpinner, isUserLoggedIn  } = useSelector(
    ({ application }) => application,
    shallowEqual,
  );
  return (
    <div className='App'>
      <Backdrop className={classes.backdrop} open={showSpinner}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Router>
        <Switch>
          <Route exact path='/'>
            {!isUserLoggedIn ? <Redirect to='/login' /> : <Redirect to='/dashboard' />}
          </Route>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
