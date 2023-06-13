import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
});

const Loading = () => {
    const classes = useStyles();
    return (
        <Box className={classes.loadingContainer}>
            <CircularProgress color="secondary" />
        </Box>
    )
}

export default Loading
