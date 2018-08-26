import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
  AppBar, Toolbar, IconButton, Typography, Button, Badge,
} from '@material-ui/core';
import { ShoppingCart, Info, Comment, AddShoppingCart } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';
import logo from '../../imgs/logo.png';
import './style.css';
import { userLogout } from '../../actions/users';

const LogoImg = styled.img`
  height: 40px;
`

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    margin: '5px',
  },
  badge: {
    top: -10,
    right: -15,
    fontSize: '10px', 
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    paddingTop: '90%',
  },
});

class Header extends Component {

  onLogout = () => {
    this.props.userLogout();
  }

  render() {
    const { classes, user, cartProducts } = this.props;
    let badgeCount = 0;
    cartProducts.map(item => { badgeCount += item['count'] })
    
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className = {classes.appbar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="default" aria-label="Menu">
              <LogoImg src={logo} />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Yassinebahi Project
            </Typography>
            <div>
              <Button color="inherit" component={NavLink} to="/">Home</Button>
              { !user && <Button color="inherit" component={NavLink} to="/login">Sign In</Button> }
              { user && <Button color="inherit" onClick={this.onLogout}>Sign Out</Button>}
              { user && user.isAdmin == true && <Button color="inherit" component={NavLink} to="/dashboard">Goto Admin</Button>}

            </div>
          </Toolbar>
        </AppBar>

        <div style={{ height: '70px' }}></div>
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    cartProducts: state.cart.products
  }
}

export default connect(mapStateToProps, {
  userLogout
})
(withStyles(styles)(Header));