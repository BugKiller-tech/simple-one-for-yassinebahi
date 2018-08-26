import React, { Component } from 'react'
import Header from '../../components/client/Header';
import {withStyles,
  Paper, Typography,
  TextField, InputAdornment,
  Button, Snackbar
} from '@material-ui/core';
import {
  AccountCircle,
  SecurityRounded
} from '@material-ui/icons';
import styled from 'styled-components';
import validator from 'validator';
import Api from '../../api';
import './style.css';
import logo from '../../imgs/logo.png';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/users';

const LogoImg = styled.img`
  width: 120px;
`

const styles = theme => ({
  root: {
    padding: '40px',
    textAlign: 'center'
  },
  loginButton: {
    marginTop: '30px'
  }
});

class Login extends Component {

  state = {
    email: '',
    password: '',

    snackBarOpen: false,
    snackbarMessage: '',
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    })    
  }
  onSubmit = () => {
    if (this.state.email == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the email' });  return;}
    if (!validator.isEmail(this.state.email)) { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the valid email' });  return;}
    if (this.state.password == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the password' });  return;}
    Api.signIn({
      email: this.state.email,
      password: this.state.password,
    })
    .then(res => {
      this.setState({ snackBarOpen: true, snackbarMessage: 'Successfully logged In!' });
      this.props.userLogin(res.data.user);
      this.props.history.push('/');
    })
    .catch(err => {
      this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.message });
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="login-page">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={() => { this.setState({ snackBarOpen: false }) }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
        <Header />
        <div className="login-form">
          <Paper elevation={1} className={classes.root}>
            <LogoImg src={logo} />
            <Typography variant="headline" component="h3">
              Login
            </Typography>
            <TextField 
              type="email"
              fullWidth={true} name="email"
              label="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }} 
            />
            <TextField 
              type="password"
              fullWidth={true} name="password"
              label="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityRounded />
                  </InputAdornment>
                ),
              }} 
            />
            <Button variant="outlined" color="primary" className={classes.loginButton} onClick={this.onSubmit}>
              LogIn
            </Button>

          </Paper>
        </div>
      </div>
    )
  }
}



export default connect(
  null,
  { userLogin }
)(withStyles(styles)(Login));