import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import service from '../util/service';
import { useDispatch } from 'react-redux';
import { TOGGLE_SPINNER, USER_LOGGEDIN_STATUS } from '../store/actions';
import Environment from '../environment';
import { getKeyandValueFromForm } from '../util/index';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({history}) {
  const classes = useStyles();
  const ref = useRef({});
  const dispatch = useDispatch();

  const logintoApp = async (e) => {
    const userData = getKeyandValueFromForm(ref.current);
    try {
      dispatch({ type: TOGGLE_SPINNER, payload: true });
      const reponse = await service(Environment.LOGIN, 'POST', userData);
      sessionStorage.setItem('bearerToken', reponse.token);
      history.push('/dashboard');
      dispatch({ type: USER_LOGGEDIN_STATUS, payload: true });
      dispatch({ type: TOGGLE_SPINNER, payload: false });
    } catch (error) {
      dispatch({ type: TOGGLE_SPINNER, payload: false });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form ref={ref} name='signinform' className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={logintoApp}
          >
            Sign In
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link to='/signup'>Don't have an account? Sign Up</Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        @ copy rights :2020
      </Box>
    </Container>
  );
}

export default withRouter(SignIn)
