import React, { useState } from 'react';
import { Button, TextField, FormControl, Box, makeStyles } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Cookies from 'js-cookie';
import LoginPageStyles from '../styles/LoginPageStyles';

const Login = () => {
  let [loginAndPassIsGood, setLoginAndPassIsGood] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = (event) => {
    event.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Authorization': 'Basic ' +
          btoa(login + ':' + password),
      }),
    }).then((response) => {
      if (response.status < 400) {
        return response;
      }
      throw 'bad response';
    }).then((response) => {
      return response.json()
        .then((json) => {
          return { json, response };
        });
    }).then(({ json, response }) => {
      Cookies.set('user', login);
      Cookies.set('token', json.token);
      let url = '/';
      if (Cookies.get('LastUrlForRedirect')) {
        url = Cookies.get('LastUrlForRedirect');
        Cookies.remove('LastUrlForRedirect');
      }
      window.location.replace(url);
    }).catch(() => {
      setLoginAndPassIsGood(false);
    });
  };


  const classes = LoginPageStyles();

  return (
    <Box className={classes.loginFormWrapper}>
      <VpnKeyIcon className={classes.keyIcon} />
      <FormControl className={classes.loginForm}>
        <TextField
          variant='outlined'
          type='login'
          placeholder='Login'
          value={login}
          onChange={(e) => setLogin(e.target.value)} />
        <TextField
          variant='outlined'
          type='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {!loginAndPassIsGood &&
          <h1>
            BAD PASS
        </h1>
        }
        <Button variant='contained' color='primary' onClick={loginSubmit}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Login;
