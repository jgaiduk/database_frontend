import { makeStyles } from '@material-ui/core';


const ImageUploadStyles = makeStyles({
    paperWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        // margin: 20,
        padding: 10,
        // minHeight: '50vh',
        minWidth: '50vh',
        maxWidth: '50vh'
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeSelector: {
        minWidth: '50vh',
        display: 'grid',
        margin: 20,
        backgroundColor: 'aliceblue'
    },
    fileSelector: {
        backgroundColor: 'aliceblue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        border: '1px solid #b9bfc4',
        borderRadius: 4
    },
    form: {
        minWidth: '50vh',
    },
    input: {
        display: 'none'
    },
    selectionWidget: {
        backgroundColor: 'beige',
        border: '2px dotted brown'
    },
    textBox: {
        marginLeft: 10
    },
    icon: {
        height: 100,
        width: 100,
        fill: '#3f51b5',
        marginTop: 30,
        marginBottom: 20
    },
    infoLog: {
        margin: 20,
        padding: 20
    }
});


export default ImageUploadStyles;


