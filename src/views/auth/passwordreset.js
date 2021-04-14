import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
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
import Snackbar from '@material-ui/core/Snackbar';

const PasswordReset = () => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);
    const [openError, setOpenError] = useState(false)

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
        }
    };

    const firebase = useFirebaseApp();

    const sendResetEmail = event => {
        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setError(null);
                setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
            })
            .catch((error) => {
                setError(error.message);
                setEmailHasBeenSent(null);
                setOpenError(true)
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset your Password
                </Typography>
                <form className={classes.form} onSubmit={sendResetEmail}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                placeholder="Input your email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    {emailHasBeenSent && (
                        <Alert severity="success" variant="standard" className={classes.alert}>
                            An email has been sent to you!
                        </Alert>
                    )}
                    {error && (
                            <Alert severity="error" variant="standard" className={classes.alert}>
                                {error}
                            </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send me a reset link
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Back to sign in page
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
};

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
        margin: theme.spacing(0, 0, 2),
    },
    alert: {
        margin: theme.spacing(2, 0, 2),
    }
}));


export default PasswordReset;