import axios from 'axios';

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
}

export default {

  signUp: (data) => axios.post('/api/users/register', data),
  signIn: (data) => axios.post('/api/users/login', data),
  checkLogin: () => axios.post('/api/users/checkLogin'),

  createCategory: (data) => axios.post('/api/categories/create', data),
  updateCategory: (data) => axios.post('/api/categories/update', data),
  deleteCategory: (data) => axios.post('/api/categories/delete', data),
  getAllCategory: () => axios.get('/api/categories/all'),


  createProduct: (data) => axios.post('/api/products/create', data, config),
  updateProduct: (data) => axios.post('/api/products/update', data, config),
  deleteProduct: (data) => axios.post('/api/products/delete', data),
  getAllProducts: () => axios.get('/api/products/all'),


  makeOrder:  (data) => axios.post('/api/charge', data),


  getAllOrders: () => axios.get('/api/orders/all'),
  getMyOrders: () => axios.get('/api/orders/getMyHistory'),
  setAsDeliveredOrder: (data) => axios.post('/api/orders/setAsDelivered', data),
}