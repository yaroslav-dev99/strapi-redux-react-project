import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCartQuery, useRemoveFromCartMutation } from '../api/apiSlice';
import PreHeader from '../component/PreHeader';
import Header from '../component/Header';

import '../assets/plugins/font-awesome/css/font-awesome.min.css';
import '../assets/plugins/bootstrap/css/bootstrap.min.css';
import '../assets/plugins/fancybox/source/jquery.fancybox.css'
import '../assets/plugins/owl.carousel/assets/owl.carousel.css';
import '../assets/plugins/uniform/css/uniform.default.css';
import '../assets/plugins/rateit/src/rateit.css';
import '../assets/pages/css/components.css';
import '../assets/corporate/css/style.css';
import '../assets/corporate/css/style-responsive.css';
import '../assets/corporate/css/themes/red.css';
import '../assets/corporate/css/custom.css';
import '../assets/pages/css/style-shop.css';

const CartPage = () => {
  const navigate = useNavigate();
  let userdata = JSON.parse(String(localStorage.getItem('user')));
  if(!userdata)  navigate('/login');

  const { data: cart, isLoading, error } = useGetCartQuery(userdata.id);
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleRemove = (productId: number) => {
    removeFromCart(productId).catch((err) => console.error('Failed to remove product:', err));
  };

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart:::{localStorage.getItem('token')}</div>;

  const items = cart?.data[0].Items || []; // Default to an empty array if undefined
  let total = 0;
  let total_fee = 0;
  let total_price = 0;
  items.map((item:any) => {
    total_price += item.quantity*item.product.Price;
  });
  total = total_fee + total_price;

  return (
    <div>
      <PreHeader />
      <Header />
      <div className="main">
        <div className="container">
          <div className="row margin-bottom-40">
            <div className="col-md-12 col-sm-12">
            <h1>Shopping cart</h1>
            <div className="goods-page">
              <div className="goods-data clearfix">
                <div className="table-wrapper-responsive">
                <table summary="Shopping cart">
                  <tr>
                    <th className="goods-page-image">Image</th>
                    <th className="goods-page-description">Title</th>
                    <th className="goods-page-quantity">Quantity</th>
                    <th className="goods-page-price">Unit price</th>
                    <th className="goods-page-total" >Total</th>
                  </tr>
                  {items.map((item: any) => ( 
                  <tr>
                    <td className="goods-page-image">
                      <a href="javascript:;"><img src={`http://localhost:1337${item.product.Image.url}`} alt="Berry Lace Dress"/></a>
                    </td>
                    <td className="goods-page-description">
                      <h3><a href="javascript:;">{item.product.Title}</a></h3>
                    </td>
                    <td className="goods-page-quantity">
                      <div className="product-quantity">
                          <input id="product-quantity" type="text" value={`${item.quantity}`} className="form-control input-sm"/>
                      </div>
                    </td>
                    <td className="goods-page-price">
                      <strong><span>$</span>{item.product.Price}</strong>
                    </td>
                    <td className="goods-page-total">
                      <strong><span>$</span>{item.quantity*item.product.Price}</strong>
                    </td>
                    <td className="del-goods-col">
                      <a className="del-goods" href="javascript:;">&nbsp;</a>
                    </td>
                  </tr>
                  ))}
                </table>
                </div>

                <div className="shopping-total">
                  <ul>
                    <li>
                      <em>Sub total</em>
                      <strong className="price"><span>$</span>{total_price}</strong>
                    </li>
                    <li>
                      <em>Shipping cost</em>
                      <strong className="price"><span>$</span>{total_fee}</strong>
                    </li>
                    <li className="shopping-total-price">
                      <em>Total</em>
                      <strong className="price"><span>$</span>{total}</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <a className="btn btn-default" href='/product-page'>Continue shopping <i className="fa fa-shopping-cart"></i></a>
              <button className="btn btn-primary" type="submit">Checkout <i className="fa fa-check"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
    // <div classNameName="cart">
    //   <h2>Your Shopping Cart</h2>
    //   {productList.map((product: any) => (
    //     <div key={product.id} classNameName="cart-item product-card">
    //       {/* <img src={product.image.url} alt={product.title} /> */}
    //       <h3>{product.Title}</h3>  
    //       <p>Price: ${product.Price}</p>
    //       <button onClick={() => handleRemove(product.id)}>Remove</button>
    //     </div>
    //   ))}
    // </div>
  );
};

export default CartPage;
