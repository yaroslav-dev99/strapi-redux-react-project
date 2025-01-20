import '../controllers/cart-product'
export default {
    routes: [
      {
        method: 'POST',
        path: '/cart/product',
        handler: 'api::cart.cart-product.addProduct',
        config: {
          prefix: '',
        },
      },
    ],
};
  