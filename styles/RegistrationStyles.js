import { makeStyles } from '@material-ui/core';

const RegistrationStyles = makeStyles({
    rootWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        '& h6': {
            color: '#3f51b5',
        }
    },
    regForm: {
        margin: 20,
        width: 300,
    },
    userIcon: {
        width: 80,
        height: 80,
        fill: '#3f51b5',
    }
});

export default RegistrationStyles;