import React from 'react'
import { makeStyles } from '@mui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        color: 'white !important',
        background: 'rgb(27, 94, 32) !important',
    },
});

const CustomButton = ({ onClick, color, variant, children, ...rest }) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} onClick={onClick} color={color} variant={variant} {...rest}>
            {children}
        </Button>
    )
}

export default CustomButton