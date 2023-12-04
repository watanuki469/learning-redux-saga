import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'hooks';
// import { authActions } from 'features/auth/authSlice';
import { logout } from 'features/auth/authSlice';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },
}));

export function Header() {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    //   useEffect(() => {
    //     cityApi.getAll().then((response) => console.log(response));
    //   });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Student Management
                    </Typography>

                    <Button variant="contained" color="primary" 
                     onClick={() => dispatch(logout())} >
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}