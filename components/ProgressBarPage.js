import React, { useState } from 'react';
import socket from './socket.js';
import {
  LinearProgress, CircularProgress,
  Typography, Box
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ProgressBarPageStyles from '../styles/ProgressBarPageStyles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';


let once = true;

const ProgressBarPage = () => {
  const classes = ProgressBarPageStyles();
  const [validateStatus, setValidateStatus] = useState(0);
  const [annotationsLoadValue, setAnnotationsLoadValue] = useState(0);
  const [imagesLoadValue, setImagesLoadValue] = useState(0);
  const [infoLog, updateInfoLog] = useState([]);

  if (imagesLoadValue === 100
    && annotationsLoadValue === 100
    && validateStatus != 1) { setValidateStatus(1); }

  socket.on('annotations_progress_bar', (data) => {
    setAnnotationsLoadValue(data.value);
  });
  socket.on('image_progress_bar', (data) => {
    setImagesLoadValue(data.value);
  });
  socket.on('validate_notifications', (data) => {
    updateInfoLog([...infoLog, data.message]);
  });

  if (once) {
    fetch('/api/v1/validate', {
      method: 'POST',
      credentials: 'include'
    }).then((response) => {
      if (response.status < 400) {
        return response;
      }
      throw 'bad response';
    }).then((response) => {
      Promise.all([
        fetch('/api/v1/add_records', {
          method: 'POST',
          credentials: 'include'
        }).then((response) => {
          if (response.status < 400) {
            return response;
          }
          throw 'bad response';
        }),
        fetch('/api/v1/upload_images_hadoop', {
          method: 'POST',
          credentials: 'include'
        }).then((response) => {
          if (response.status < 400) {
            return response;
          }
          throw 'bad response';
        }),
      ]);
    }).catch(() => {
      console.log('bad');
    });
    once = false;
  }

  const allDone = () => (
    <>
      <CheckCircleOutlineIcon className={classes.donut} />
      <Typography variant='h4'>
        {'Done'}
      </Typography>
    </>
  );

  const allFailed = () => (
    <>
      <CancelIcon className={classes.donut} />
      <Typography variant='h4'>
        {'Fail'}
      </Typography>
      <Typography variant='h6'>
        {'Error while loading to database'}
      </Typography>
    </>
  );

  const pleaseWait = () => (
    <>
      <CircularProgress className={classes.donut} color='primary' />
      <Typography variant='h4'>
        {'Please wait...'}
      </Typography>
    </>
  );

  return (
    <Box className={classes.paperWrapper}>
      <Paper className={classes.paper}>
        <Box className={classes.mainWrapper}>
          {
            validateStatus === 0
              ? pleaseWait()
              : validateStatus === 1 ? allDone() : allFailed()
          }
        </Box>
        <Box className={classes.linesWrapper}>
          <Box className={classes.progressLineBox}>
            <Typography variant='h6'>
              {
                annotationsLoadValue < 100
                  ? 'Loading annotations...'
                  : 'Annotations loaded'
              }
            </Typography>
            <LinearProgress
              variant='determinate'
              color='primary'
              value={annotationsLoadValue} />
          </Box>

          <Box className={classes.progressLineBox}>
            <Typography variant='h6'>
              {
                imagesLoadValue < 100
                  ? 'Loading images...'
                  : 'Images loaded'
              }
            </Typography>
            <LinearProgress
              variant='determinate'
              color='primary'
              value={imagesLoadValue} />
          </Box>
        </Box>
        <Box className={classes.infoLog}>
          {infoLog.map((message) => (<p>{message}</p>))}
        </Box>

      </Paper>
    </Box>

  );
};

export default ProgressBarPage;
