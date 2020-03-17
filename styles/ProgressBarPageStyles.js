import { makeStyles } from '@material-ui/core';


const ProgressBarPageStyles = makeStyles({
    paperWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        margin: 20,
        padding: 10,
        minWidth: '50vh',
        maxWidth: '50vh'
    },
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& h4': {
            margin: 20,
        },
    },
    donut: {
        margin: 20,
        marginTop: 40,
        height: 40,
        width: 40
    },
    progressLineBox: {
        margin: 20,
        padding: 20
    },
    infoLog: {
        margin: 20,
        padding: 20
    }
});


export default ProgressBarPageStyles;


