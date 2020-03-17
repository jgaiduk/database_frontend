import { makeStyles } from '@material-ui/core';

const LoginPageStyles = makeStyles({
    loginFormWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
    },
    loginForm: {
        margin: 20,
        width: 300,
    },
    keyIcon: {
        width: 80,
        height: 80,
        fill: '#3f51b5',
    },
});

export default LoginPageStyles;