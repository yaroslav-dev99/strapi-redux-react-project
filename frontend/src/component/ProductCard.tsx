import React from 'react';
import '../styles/ProductCatalog.css';

const ProductCard = ({ product, onAddToCart }: { product: any; onAddToCart: (id: number) => void }) => (
  <div className="col-md-4 col-sm-6 col-xs-12">
    <div className="product-item">
      <div className="pi-img-wrapper">
        <img src={`http://localhost:1337${product.Image.url}`} className="img-responsive" alt={product.Title}/>
        <div>
          <a href="/img/products/model1.jpg" className="btn btn-default fancybox-button">Zoom</a>
          <a href="#product-pop-up" className="btn btn-default fancybox-fast-view">View</a>
        </div>
      </div>
      <h3><a href="shop-item.html">{product.Title}</a></h3>
      <div className="pi-price">${product.Price}</div>
      <button onClick={() => onAddToCart(product.ID)} className="btn btn-default add2cart">Add to cart</button>
    </div>
  </div>
);

export default ProductCard;
