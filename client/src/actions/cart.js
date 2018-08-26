import * as Types from './types';

export function updatedUserCart(products) {
  return {
    type: Types.UPDATED_USER_CART,
    products
  }
}


export const addThingToCart = (product) => (dispatch, getState) => {
  const store = getState();
  let cartProducts = [ ...store.cart.products];
  console.log('car of products', cartProducts);
  let found = cartProducts.find(item => {
    return item._id == product._id;
  })

  if (found) {
    found['count'] += 1;
  } else {
    cartProducts.push({
      ...product,
      count: 1
    })
  }
  localStorage.setItem('products', JSON.stringify(cartProducts))
  dispatch(updatedUserCart(cartProducts));

  console.log('state from thunk', store);  
}

export const removeThingFromCart = (product) => (dispatch, getState) => {
  const store = getState();
  let cartProducts = store.cart.products;
  
  let updatedProducts = cartProducts.map(item => {
    if (item._id == product._id) {
      item['count']--;
    }
    return item;
  }).filter(item => { return item['count'] > 0 })
  
  localStorage.setItem('products', JSON.stringify(updatedProducts))
  dispatch(updatedUserCart(updatedProducts));

}

export const clearCart = () => (dispatch, getState) => {
  localStorage.removeItem('products');
  dispatch(updatedUserCart([]));
}
