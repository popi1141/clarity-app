import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Copyright from '../../components/copyright/copyright.js';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';

const SignOut = () => {
    const classes = useStyles();
    const user = useUser();
    console.log(user)
    // Import firebase
    const firebase = useFirebaseApp();

    // Log out function
    const handleClick = () => {
        firebase.auth().signOut();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {user.data && `Hi ${user.data.displayName}, would you like to Log Out? `}
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleClick}
                    component={Link}
                    to={'/login'}
                >
                    Log Out
                </Button>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
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
        margin: theme.spacing(3, 0, 2),
    },
}));


export default SignOut;