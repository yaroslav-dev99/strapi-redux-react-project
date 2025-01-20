import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreHeader = () => {
    let userdata = JSON.parse(String(localStorage.getItem('user')));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/land-page');
    }
    return(
        <div className="pre-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6 additional-shop-info">
                        <ul className="list-unstyled list-inline">
                            <li><i className="fa fa-phone"></i><span>+1 456 6717</span></li>
                            <li className="shop-currencies">
                                <a href="javascript:void(0);">€</a>
                                <a href="javascript:void(0);">£</a>
                                <a href="javascript:void(0);" className="current">$</a>
                            </li>
                            <li className="langs-block">
                                <a href="javascript:void(0);" className="current">English </a>
                                <div className="langs-block-others-wrapper"><div className="langs-block-others">
                                <a href="javascript:void(0);">French</a>
                                <a href="javascript:void(0);">Germany</a>
                                <a href="javascript:void(0);">Turkish</a>
                                </div></div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-sm-6 additional-nav">
                        <ul className="list-unstyled list-inline pull-right">
                            <li><a href="shop-account.html">My Account</a></li>
                            <li><a href="shop-wishlist.html">My Wishlist</a></li>
                            <li><a href="shop-checkout.html">Checkout</a></li>
                            {userdata?.id > 0 ? (
                                <li><a onClick={()=>logout()}>Log Out</a></li>
                            ):(
                                <li><a href="/login">Log In</a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>        
        </div>
    );
}
export default PreHeader;
