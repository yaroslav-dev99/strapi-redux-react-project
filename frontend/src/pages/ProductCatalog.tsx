import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import $ from 'jquery';

import { useGetProductsQuery, useAddToCartMutation, useGetCartQuery } from '../api/apiSlice';
import ProductCard from '../component/ProductCard';
import '../styles/ProductCatalog.css';
import PreHeader from '../component/PreHeader';
import Header from '../component/Header';
import socket from "../services/websocket";

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

const ProductCatalog = () => {
  interface Product {
    id: string;
    title: string;
    price: number;
    image: string; // Adjust based on your actual structure
  }
  const navigate = useNavigate();
  let userdata = JSON.parse(String(localStorage.getItem('user')));
  if(!userdata)  navigate('/login');
  const [productList, setProductList] = useState<Product[]>([]);
  const { data: products, error:productsError, isLoading:productsLoading } = useGetProductsQuery({});
  const { data: cart, error:cartError, isLoading:cartLoading } = useGetCartQuery(userdata.id);
  const [addToCart, { isLoading, isError }] = useAddToCartMutation();
  let cartId = 0;
  if (cartLoading) {
    console.log('Loading cart...');
  } else if (cartError) {
    console.error('Error loading cart:', cartError);
  } else {
    cartId = cart?.data?.[0]?.id || 0;
    console.log('Cart ID:', cartId);
  }
  
  const handleAddToCart = async (productId: number) => {
    try {
      // Call createItem mutation function to trigger the mutation
      await addToCart({ cartId, productId, quantity: 1 }).unwrap();
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };
  useEffect(() => {
    if (products) {
      setProductList(products.data || []);
    }
  }, [products]);

  useEffect(() => {
    // Listen for cart updates from WebSocket
    socket.on("product-created", (newProduct) => {
      setProductList((prevProducts) => [...prevProducts, newProduct]);
    });

    return () => {
      socket.off('product-created'); // Cleanup listener on unmount
    };
  },[]);

  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Error loading products</div>;

  // Ensure `products.data` is an array
  //setProductList(products?.data || []); // Default to an empty array if undefined


  return (
    <div>
      <PreHeader />
      <Header />
      <div className="title-wrapper">
        <div className="container"><div className="container-inner">
          <h1><span>MEN</span> CATEGORY</h1>
          <em>Over 4000 Items are available here</em>
        </div></div>
      </div>
      <div className="main">
        <div className="container">
          <ul className="breadcrumb">
              <li><a href="index.html">Home</a></li>
              <li><a href="">Store</a></li>
              <li className="active">Men category</li>
          </ul>
        {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
          <div className="row margin-bottom-40">
          {/* <!-- BEGIN SIDEBAR --> */}
            <div className="sidebar col-md-3 col-sm-5">
            <ul className="list-group margin-bottom-25 sidebar-menu">
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Ladies</a></li>
              <li className="list-group-item clearfix dropdown active">
                <a href="javascript:void(0);" className="collapsed">
                  <i className="fa fa-angle-right"></i>
                  Mens
                  
                </a>
                <ul className="dropdown-menu" style={{display:'block'}}>
                  <li className="list-group-item dropdown clearfix active">
                    <a href="javascript:void(0);" className="collapsed"><i className="fa fa-angle-right"></i> Shoes </a>
                      <ul className="dropdown-menu" style={{display:'block'}}>
                        <li className="list-group-item dropdown clearfix">
                          <a href="javascript:void(0);"><i className="fa fa-angle-right"></i> classNameic </a>
                          <ul className="dropdown-menu">
                            <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> classNameic 1</a></li>
                            <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> classNameic 2</a></li>
                          </ul>
                        </li>
                        <li className="list-group-item dropdown clearfix active">
                          <a href="javascript:void(0);" className="collapsed"><i className="fa fa-angle-right"></i> Sport  </a>
                          <ul className="dropdown-menu" style={{display:'block'}}>
                            <li className="active"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Sport 1</a></li>
                            <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Sport 2</a></li>
                          </ul>
                        </li>
                      </ul>
                  </li>
                  <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Trainers</a></li>
                  <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Jeans</a></li>
                  <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Chinos</a></li>
                  <li><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> T-Shirts</a></li>
                </ul>
              </li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Kids</a></li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Accessories</a></li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Sports</a></li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Brands</a></li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Electronics</a></li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Home & Garden</a></li>
              <li className="list-group-item clearfix"><a href="shop-product-list.html"><i className="fa fa-angle-right"></i> Custom Link</a></li>
            </ul>

            <div className="sidebar-filter margin-bottom-25">
              <h2>Filter</h2>
              <h3>Availability</h3>
              <div className="checkbox-list">
                <label><input type="checkbox"/> Not Available (3)</label>
                <label><input type="checkbox"/> In Stock (26)</label>
              </div>

              <h3>Price</h3>
              <p>
                <label className="amount">Range:</label>
                <input type="text" id="amount" />
              </p>
              <div id="slider-range"></div>
            </div>

            <div className="sidebar-products clearfix">
              <h2>Bestsellers</h2>
              <div className="item">
                <a href="shop-item.html"><img src="/img/products/k1.jpg" alt="Some Shoes in Animal with Cut Out"/></a>
                <h3><a href="shop-item.html">Some Shoes in Animal with Cut Out</a></h3>
                <div className="price">$31.00</div>
              </div>
              <div className="item">
                <a href="shop-item.html"><img src="/img/products/k4.jpg" alt="Some Shoes in Animal with Cut Out"/></a>
                <h3><a href="shop-item.html">Some Shoes in Animal with Cut Out</a></h3>
                <div className="price">$23.00</div>
              </div>
              <div className="item">
                <a href="shop-item.html"><img src="/img/products/k3.jpg" alt="Some Shoes in Animal with Cut Out"/></a>
                <h3><a href="shop-item.html">Some Shoes in Animal with Cut Out</a></h3>
                <div className="price">$86.00</div>
              </div>
            </div>
          </div>
          {/* <!-- END SIDEBAR -->
          <!-- BEGIN CONTENT --> */}
          <div className="col-md-9 col-sm-7">
            <div className="row list-view-sorting clearfix">
              <div className="col-md-2 col-sm-2 list-view">
                <a href="javascript:;"><i className="fa fa-th-large"></i></a>
                <a href="javascript:;"><i className="fa fa-th-list"></i></a>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="pull-right">
                  <label className="control-label">Show:</label>
                  <select className="form-control input-sm">
                    <option value="#?limit=24">24</option>
                    <option value="#?limit=25">25</option>
                    <option value="#?limit=50">50</option>
                    <option value="#?limit=75">75</option>
                    <option value="#?limit=100">100</option>
                  </select>
                </div>
                <div className="pull-right">
                  <label className="control-label">Sort&nbsp;By:</label>
                  <select className="form-control input-sm">
                    <option value="#?sort=p.sort_order&amp;order=ASC">Default</option>
                    <option value="#?sort=pd.name&amp;order=ASC">Name (A - Z)</option>
                    <option value="#?sort=pd.name&amp;order=DESC">Name (Z - A)</option>
                    <option value="#?sort=p.price&amp;order=ASC">Price (Low &gt; High)</option>
                    <option value="#?sort=p.price&amp;order=DESC">Price (High &gt; Low)</option>
                    <option value="#?sort=rating&amp;order=DESC">Rating (Highest)</option>
                    <option value="#?sort=rating&amp;order=ASC">Rating (Lowest)</option>
                    <option value="#?sort=p.model&amp;order=ASC">Model (A - Z)</option>
                    <option value="#?sort=p.model&amp;order=DESC">Model (Z - A)</option>
                  </select>
                </div>
              </div>
            </div>
            {/* <!-- BEGIN PRODUCT LIST --> */}
            <div className="row product-list">
              {/* <!-- PRODUCT ITEM START --> */}
              {productList.length > 0 ? (
                productList.map((product: any) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))
              ) : (
                <div>No products available</div>
              )}
            </div>
            {/* <!-- END PRODUCT LIST -->
            <!-- BEGIN PAGINATOR --> */}
            <div className="row">
              <div className="col-md-4 col-sm-4 items-info">Items 1 to 9 of 10 total</div>
              <div className="col-md-8 col-sm-8">
                <ul className="pagination pull-right">
                  <li><a href="javascript:;">&laquo;</a></li>
                  <li><a href="javascript:;">1</a></li>
                  <li><span>2</span></li>
                  <li><a href="javascript:;">3</a></li>
                  <li><a href="javascript:;">4</a></li>
                  <li><a href="javascript:;">5</a></li>
                  <li><a href="javascript:;">&raquo;</a></li>
                </ul>
              </div>
            </div>
            {/* <!-- END PAGINATOR --> */}
          </div>
          {/* <!-- END CONTENT --> */}
        </div>
        {/* <!-- END SIDEBAR & CONTENT --> */}
      </div>
    </div>

      {/* <div className="product-catalog">
        {productList.length > 0 ? (
          productList.map((product: any) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div> */}
    </div>
  );
};

export default ProductCatalog;
