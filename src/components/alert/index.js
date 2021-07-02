import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


const TransactionAlert = ({ open, text, close, type,...rest}) => {

    return (
            <Collapse in={open}>
                <Alert
                    {...rest}
                    severity={type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                close(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {text}
                </Alert>
            </Collapse>
    );
}
 export  default TransactionAlert;
