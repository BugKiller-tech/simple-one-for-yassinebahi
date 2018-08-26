import React, { Component } from 'react'
import Header from '../../components/Header';
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
    name: '',
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
    if (this.state.name == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the name' });  return;}
    if (this.state.password == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the password' });  return;}
    Api.signIn({
      name: this.state.name,
      password: this.state.password,
    })
    .then(res => {
      this.setState({ snackBarOpen: true, snackbarMessage: 'Successfully logged In!' });
      this.props.userLogin(res.data.user);
      this.props.history.push('/dashboard');
    })
    .catch(err => {
      this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.errors });
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
              type="text"
              fullWidth={true} name="name"
              label="name"
              value={this.state.name}
              onChange={this.handleChange('name')}
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