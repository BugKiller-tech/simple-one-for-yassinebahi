import axios from 'axios';

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
}

export default {

  
  signIn: (data) => axios.post('/user/login', data),
  checkLogin: () => axios.post('/user/checkLogin'),


  getProjects: () => axios.get('/projets'),

  getPlateformes: () => axios.get('/plateformes'),
  getErrors: () => axios.get('/errors'),

  
}