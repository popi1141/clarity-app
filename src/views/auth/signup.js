import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Copyright from '../../components/copyright/copyright.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const SignUp = () => {
  const classes = useStyles();

  // Import firebase
  const firebase = useFirebaseApp();

  // User State
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    verifyEmail: '',
  });

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Submit function (Create account)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sign up code here.
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        // Update the nickname
        result.user.updateProfile({
          displayName: user.firstName,
        })

        // URL of my website.
        const myURL = { url: 'http://localhost:3001/' }

        // Send Email Verification and redirect to my website.
        result.user.sendEmailVerification(myURL)
          .then(() => {
            setUser({
              ...user,
              verifyEmail: `Welcome ${user.firstName} ${user.lastName}. To continue please verify your email.`,
              error: null
            })
          })
          .catch(error => {
            setUser({
              ...user,
              verifyEmail: null,
              error: error.message,
            })
          })

        // const uid = firebase.auth().currentUser.uid
        // console.log(uid)
        // firebase.firestore()
        //   .collection('users')
        //   .add({uid})

        // Sign Out the user.
        firebase.auth().signOut();

      }).catch(error => {
        // Update the error
        console.log(error);
        setUser({
          ...user,
          verifyEmail: null,
          error: error.message,
        })
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            <Grid item>
              {user.verifyEmail && (
                <Alert severity="success" variant="standard" className={classes.alert}>
                  {user.verifyEmail}
                </Alert>
              )}

              {user.error && (
                <Alert severity="error" variant="standard" className={classes.alert}>
                  {user.error}
                </Alert>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">

            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

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
  alert: {
    margin: theme.spacing(2, 0, 2),
  }
}));

export default SignUp;

