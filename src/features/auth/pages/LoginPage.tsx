import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'hooks';
import { login } from '../authSlice';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    box: {
        padding: theme.spacing(3),
    },
}));

export function LoginPage() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector((state) => state.auth.logging);

    const handleLoginClick = () => {
        // TODO: Get username + pwd from login form

        dispatch(
            login({
                username: '',
                password: '',
            })
        );
    };

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>

                <Box mt={4}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
                        {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
                    </Button>
                </Box>
            </Paper>
        </div>

    )
}