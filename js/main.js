import CartController from './controllers/cartController.js';


document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('carritoM')){
    new CartController();
  }
  
});   
