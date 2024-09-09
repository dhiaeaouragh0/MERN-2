import React, { useState } from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import Search from '../layout/Search';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {logout} from '../../actions/userActions'



const Navbar = () => {
  const { isAuthenticated} = useSelector(state => state.auth)
  const { cartItems} = useSelector(state => state.cart);

  const Menu = () => (
    <>
      <p><Link to='/'>Home</Link></p>
      <p><Link to='/shop'>Shop</Link></p>
      <p>
          <Link to='/cart' className="cart-link"> Cart</Link>
          {isAuthenticated ? 
          <span className="cart-count">{cartItems.length}</span>
        :[]}
      </p>
  
  
    </>
  );

  const [toggleMenu, setToggleMenu] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const toggleUserDetails = () => {
    setUserDetail((prevState) => !prevState);
  };

  const logoutHandler = () => {
    toggleUserDetails();
    dispatch(logout());
    alert.success('Logged out successfully .');
  }
  return (
    <div className='gpt3__navbar'>
      <div className='gpt3__navbar-links_logo col-md-2'>
        <Link to='/'><img src={logo} alt='logo' /></Link>
        </div>  
      <div className='gpt3__navbar-links'>
        <div className='gpt3__navbar-links_container'>
          <Menu />
        </div>
      </div>

      <div className='bare-rech'>
        <Search />
      </div>

      <div className='gpt3__navbar-sign'>
        {user ? (
          <div className="user-dropdown">
            <button 
              className='btn dropdown-toggle text-white' 
              type='button' 
              onClick={toggleUserDetails}
            >
              <figure className='avatar avatar-nav'>
                <img 
                  className='rounded-circle' 
                  src={user.avatar && user.avatar.url} 
                  alt={user && user.name} 
                />
              </figure>
              <span>{user && user.name}</span>
            </button>
            {userDetail && (
              <div className='dropdown-menu show'>
                {user && user.role === 'admin' && (
                  <Link onClick={toggleUserDetails} className='dropdown-item' to="/dashboard">Dashboard</Link>
                )}
                <Link onClick={toggleUserDetails} className='dropdown-item' to="/orders/me">Orders</Link>
                <Link onClick={toggleUserDetails} className='dropdown-item' to="/me">Profile</Link>
                <Link onClick={logoutHandler} className='dropdown-item text-danger' to="/">Logout</Link>
              </div>
            )}
          </div>
        ) : !loading && <Link to="/login"><button type='button'>Sign In</button></Link>}
      </div>

      <div className='gpt3__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='gpt3__navbar-menu_container scale-up-center'>
            <div className='gpt3__navbar-menu_container-links'>
              <Menu />
              <p><div className='hide-bare'><Search /></div></p>

              <div className='gpt3__navbar-menu_container-links-sign'>
                {user ? (
                  <div className="user-dropdown">
                    <button 
                      className='btn dropdown-toggle text-white' 
                      type='button' 
                      onClick={toggleUserDetails}
                    >
                      <figure className='avatar avatar-nav'>
                        <img 
                          className='rounded-circle' 
                          src={user.avatar && user.avatar.url} 
                          alt={user && user.name} 
                        />
                      </figure>
                      <span>{user && user.name}</span>
                    </button>
                    {userDetail && (
                      <div className='dropdown-menu show'>

                        {user && user.role !== 'user' ? (
                          <Link onClick={toggleUserDetails} className='dropdown-item' to="/orders/me">Orders</Link>
                        ):(
                          <Link onClick={toggleUserDetails} className='dropdown-item' to="/dashboard" >Dashboard</Link>
                        )}
                        <Link onClick={toggleUserDetails} className='dropdown-item' to="/me">Profile</Link>
                        <Link onClick={logoutHandler} className='dropdown-item text-danger' to="/">
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                ) : !loading && <Link to="/login"><button type='button'>Sign In</button></Link>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
