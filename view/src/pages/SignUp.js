import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import service from '../util/service';
import { useDispatch } from 'react-redux';
import { TOGGLE_SPINNER, USER_LOGGEDIN_STATUS } from '../store/actions';
import Environment from '../environment';
import { getKeyandValueFromForm } from '../util';
import { Link, withRouter } from 'react-router-dom';


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({history}) {
  const classes = useStyles();
  const signUpref = useRef({});
  const dispatch = useDispatch();

  const signUp = async (e) => {
    const userData = getKeyandValueFromForm(signUpref.current);
    userData['username'] = userData.email;
    try {
      dispatch({ type: TOGGLE_SPINNER, payload: true });
      const reponse = await service(Environment.SIGN_UP, 'POST', userData);
      sessionStorage.setItem('bearerToken', reponse.token);
      history.push('/dashboard');
      dispatch({ type: USER_LOGGEDIN_STATUS, payload: true });
      dispatch({ type: TOGGLE_SPINNER, payload: false });
    } catch (error) {
      dispatch({ type: TOGGLE_SPINNER, payload: false });
      console.log(error);
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
          Sign up
        </Typography>
        <form
          ref={signUpref}
          name='signupform'
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link to='/signup'>Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
      @ copy rights :2020
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);