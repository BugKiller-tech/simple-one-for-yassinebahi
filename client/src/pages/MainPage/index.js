import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { 
  IconButton, Typography, Button, 
  // GridList, GridListTile, ListSubheader, GridListTileBar,
  List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction,
  Card, CardMedia, CardContent, CardActions,
} from '@material-ui/core';

// import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import './style.css'

const styles = theme => ({
 root: {
 }
});

class MainPage extends Component {
  state = {
    
  }

  render() {
    const { classes } = this.props;
    const { products, checkedCategoryIndexs } = this.state;
    return (
      <div className={classes.root} id="main-page">
        <Header />
        <div className="container text-center text-white">
          <h1>Welcome to visit mobile-eye website!</h1>
          
          <p>
            Programmed by yassinebahi & bugkiller
          </p>
        </div>
      </div>
    )
  }
}


MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);