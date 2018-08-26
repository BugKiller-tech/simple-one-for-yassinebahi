import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, GridList, Paper } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';

import moment from 'moment';
import Header from '../../components/Header';
import './index.css';
import Api from '../../api';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  totalLabel: {
    paddingLeft: '20px',
    fontSize: '35px'
  }
});

class DashboardMain extends Component {

  state = {
    projects: [],
    plateformes: [],
    errors: [],

    appIds: [],

    loading: false,
    dispType: 'day',  // day | month
    trafficType: 'packets',
    selectedAppId: '',
  }

  componentDidMount = () => {

    if (!this.props.user) {
      this.props.history.push('/');
    }

    Api.getProjects().then(res => {
      // console.log(res.data);

      let appIds = [];
      res.data.map(item => {
        if (!appIds.includes(item.control.appId))
          appIds.push(item.control.appId);
      })
      let selectedAppId = appIds.length > 0 ? appIds[0] : '';
      this.setState({ projects: res.data, appIds: appIds, selectedAppId: selectedAppId })
    }).catch(err => {  })
    Api.getPlateformes().then(res => {
      // console.log(res.data);
      this.setState({ plateformes: res.data })
    }).catch(err => {  })
    Api.getErrors().then(res => {
      console.log(res.data);
      this.setState({ errors: res.data })
    }).catch(err => {  })
  }



  render () {
    const { projects, plateformes, errors, appIds } = this.state;
    const { classes } = this.props;

    let tempDates = []
    let dataAll = []; let dataAndroid = []; let dataiOS = [];
    plateformes.map(item => {
      let d = moment(item.reportDate)
      let found = tempDates.find((element) => {
        if (this.state.dispType == 'day') return element.isSame(d, 'day');  else  return element.isSame(d, 'month');
      })

      let key = '';
      if (this.state.dispType == 'day') key = d.format('YYYY-MM-DD'); else key = d.format('YYYY-MM');

      if (found) {
        // if (!dataAll[key]) dataAll[key] = 0; 
        // if (!dataAndroid[key]) dataAndroid[key] = 0; 
        // if (!dataiOS[key]) dataiOS[key] = 0; 
        dataAll[key]++;
        if (item.platform.system == 'Android') dataAndroid[key]++;
        if (item.platform.system == 'ios') dataiOS[key]++;
      } else {
        tempDates.push(d);
        dataAll[key] = 1;
        if (item.platform.system == 'Android') dataAndroid[key] = 1; else dataAndroid[key] = 0;
        if (item.platform.system == 'ios') dataiOS[key] = 1; else dataiOS[key] = 0;
      }
    });
    let renderLabel = []; let renderDataAll = [], renderDataAndroid = [], renderDataiOS = [];
    Object.keys(dataAll).sort().map(key => {
      renderLabel.push(key);
      renderDataAll.push(dataAll[key]);
      renderDataAndroid.push(dataAndroid[key]);
      renderDataiOS.push(dataiOS[key]);
    })
    const data1 = {
      labels: renderLabel,
      datasets: [
        {
          label: 'All',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointBorderColor: 'rgba(75,192,192,1)',
          data: renderDataAll
        },
        {
          label: 'iOS',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(0, 128, 0, 0.4)',
          borderColor: 'rgba(0, 128, 0, 1)',
          pointBorderColor: 'rgba(0, 128, 0, 1)',
          data: renderDataiOS
        },
        {
          label: 'Android',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(191, 0, 255, 0.4)',
          borderColor: 'rgba(191, 0, 255, 1)',
          pointBorderColor: 'rgba(191, 0, 255, 1)',
          data: renderDataAndroid
        }
      ]
    };


    tempDates = []
    let dataMissId = []; let dataNotCorrect = [];
    errors.map(item => {
      let d = moment(item.createdAt)

      let found = tempDates.find((element) => {
        if (this.state.dispType == 'day') return element.isSame(d, 'day');  else  return element.isSame(d, 'month');
      })
      let key = '';
      if (this.state.dispType == 'day') key = d.format('YYYY-MM-DD'); else key = d.format('YYYY-MM');

      if (found) {
        // if (!dataMissId[key]) dataAndroid[key] = 0; 
        // if (!dataNotCorrect[key]) dataiOS[key] = 0; 
        if (item.content == 'missing app_id') dataMissId[key]++; else dataNotCorrect[key]++;
      } else {
        tempDates.push(d);
        if (item.content == 'missing app_id') {
          dataMissId[key] = 1; 
          dataNotCorrect[key] = 0;
        }else {
          dataMissId[key] = 0; 
          dataNotCorrect[key] = 1;
        }
      }
    })

    let renderErrorLabel = []; let renderMissingError = []; let renderNotCorrectError = [];
    Object.keys(dataMissId).sort().map(key => {
      renderErrorLabel.push(key);
      renderMissingError.push(dataMissId[key]);
      renderNotCorrectError.push(dataNotCorrect[key]);
    })
    const error_data = {
      labels: renderErrorLabel,

      datasets: [
        {
          label: 'Missing Id',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointBorderColor: 'rgba(75,192,192,1)',
          data: renderMissingError
        },
        {
          label: 'Not Correct',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(0, 128, 0, 0.4)',
          borderColor: 'rgba(0, 128, 0, 1)',
          pointBorderColor: 'rgba(0, 128, 0, 1)',
          data: renderNotCorrectError
        },
      ]
    };
    
    // Traffic Graph
    tempDates = []
    let txData = []; let rxData = [];
    projects.map(item => {
      if (item.control.appId !== this.state.selectedAppId) return;
      let d = moment(item.createdAt)

      let found = tempDates.find((element) => {
        if (this.state.dispType == 'day') return element.isSame(d, 'day');  else  return element.isSame(d, 'month');
      })
      let key = '';
      if (this.state.dispType == 'day') key = d.format('YYYY-MM-DD'); else key = d.format('YYYY-MM');

      if (found) {
        // if (!dataMissId[key]) dataAndroid[key] = 0; 
        // if (!dataNotCorrect[key]) dataiOS[key] = 0; 
        if (this.state.dispType == 'day') {
          txData[key] += item.traffic.global[this.state.trafficType]['tx'];
          rxData[key] += item.traffic.global[this.state.trafficType]['rx'];
        } else {
          txData[key] += item.traffic.global[this.state.trafficType]['tx'];
          rxData[key] += item.traffic.global[this.state.trafficType]['rx'];
        }
      } else {
        tempDates.push(d);
        if (this.state.dispType == 'day') {
          txData[key] = item.traffic.global[this.state.trafficType]['tx'];
          rxData[key] = item.traffic.global[this.state.trafficType]['rx'];
        } else {
          txData[key] = 1;
          rxData[key] = 1;
        }
      }
    })

    let renderTrafficLabel = []; let renderTxData = []; let renderRxData = [];
    Object.keys(dataMissId).sort().map(key => {
      renderTrafficLabel.push(key);
      renderTxData.push(dataMissId[key]);
      renderRxData.push(dataNotCorrect[key]);
    })
    console.log('render tx', renderTxData);
    const traffic_data = {
      labels: renderTrafficLabel,
      datasets: [
        {
          label: 'Tx Data',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointBorderColor: 'rgba(75,192,192,1)',
          data: renderTxData
        },
        {
          label: 'Rx Data',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(0, 128, 0, 0.4)',
          borderColor: 'rgba(0, 128, 0, 1)',
          pointBorderColor: 'rgba(0, 128, 0, 1)',
          data: renderRxData
        },
      ]
    };




    return (
      <div className="dashboard-main">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Paper elevation={1} className={classes.root}>
                <i className="fas fa-project-diagram" style={{ fontSize: '60px', color: 'red' }}></i>
                <span className={classes.totalLabel}>
                  PROJECTS { projects.length }
                </span>
              </Paper>
            </div>
            <div className="col-md-6">
              <Paper elevation={2} className={classes.root}>
                <i className="fas fa-mobile"  style={{ fontSize: '60px', color: 'blue' }}></i>
                <span className={classes.totalLabel}>
                  PLATFORMS { plateformes.length }
                </span>
              </Paper>              
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <select className="form-control" onChange={(e) => this.setState({ dispType: e.target.value })}>
                <option value='day'>Day</option>
                <option value='month'>Month</option>
              </select>
            </div>
            <div className="col-md-6">
              <Paper elevation={1} className={classes.root}>
                <h3>Number of report</h3>
                <Line data={data1} options={{ responsive: true }}/>
              </Paper>
            </div>
            <div className="col-md-6">
              <Paper elevation={1} className={classes.root}>
                <h3>Error in month</h3>
                <Bar data={error_data} options={{ responsive: true, scales: { yAxes: [{ ticks: {  min: 0 } }], } }}/>
              </Paper>
            </div>
            <div className="col-md-12 mt-3">
              <Paper elevation={1} className={classes.root}>
                <h3>Traffic Graph</h3>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="appId text-sm">App Id</label>
                      <select className="form-control" id="appId" onChange={(e) => { this.setState({ selectedAppId: e.target.value }) }}>
                        { appIds.map((item, idx) => {
                          return (
                            <option key={idx} value={item}>{item}</option>
                          )
                        }) }
                      </select>
                    </div> 
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="trafficType">Type</label>
                      <select className="form-control" id="trafficType" onChange={(e) => { this.setState({ trafficType: e.target.value }) }}>
                        <option value="packets">Packet</option>
                        <option value="bytes">Byte</option>
                      </select>
                    </div>   
                  </div>
                </div>
                <Line data={traffic_data} options={{ responsive: true, scales: { yAxes: [{ ticks: {  min: 0 } }], } }} />

              </Paper>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(DashboardMain));