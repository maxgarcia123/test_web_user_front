import React from 'react';
import {withStyles} from "@material-ui/styles";
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//     margin: {
//         margin: theme.spacing(1),
//     },
// }));

const ButtonColorIcon = ({children,color, colorHover, ...rest}) => {
   // const classes = useStyles();
    console.log('corr', color)

    const ColorButton = withStyles({
        root: {
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '6px 12px',
            border: '1px solid',
            lineHeight: 1.5,
            backgroundColor: color,
            borderColor: color,
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                backgroundColor: colorHover,
                borderColor: colorHover,
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: color,
                borderColor: color,
            },
            '&:focus': {
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
            },
        },
    })(Button);

    return <ColorButton variant="contained" color="primary"  {...rest} >{children}</ColorButton>
};

export  default ButtonColorIcon;
