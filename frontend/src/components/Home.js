import React, { useEffect, useState, Fragment } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { useAlert } from 'react-alert';
import { useParams, useLocation } from 'react-router-dom';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, products, error, productCount, resPerPage } = useSelector(state => state.products);

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 999999]);
  const [minPrice, setMinPrice] = useState(price[0]);
  const [maxPrice, setMaxPrice] = useState(price[1]);
  const [rating, setRating] = useState([0, 5]);
  const [minRating, setMinRating] = useState(rating[0]);
  const [maxRating, setMaxRating] = useState(rating[1]);
  const [category, setCategory] = useState('');

  const categories = ['Electronics', 'Clothing', 'Books', 'Toys','Sports', 'Home', 'Other']


  const applyFilters = () => {
    setPrice([minPrice, maxPrice]);
    setRating([minRating, maxRating]);
    setCategory([category]);
    setCurrentPage(1); // Reset to first page when applying a new filter
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    
    dispatch(getProducts(keyword || '', currentPage, price, rating,category));

  }, [dispatch, alert, error, keyword, currentPage, price, rating,category, location.pathname]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          <div className="products-container">
          <div className="filter">
          <div className="category-filter">
              <label>
                Category:
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="price-filter">
              <label>
                Min Price:
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                />
              </label>
              <label>
                Max Price:
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="999999"
                />
              </label>
            </div>
            <div className="rating-filter">
              <label>
                Min Rating:
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  placeholder="0"
                />
              </label>
              <label>
                Max Rating:
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={maxRating}
                  onChange={(e) => setMaxRating(e.target.value)}
                  placeholder="5"
                />
              </label>
            </div>
            <button onClick={applyFilters}>Apply Filters</button>

            
          </div>



            <div className="products-heading-container">
              <h1 id="products_heading">Latest Products</h1>
            </div>
            


            
            <section id="products" className="container">
              <div className="gallery">
                {products && products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </section>
            {resPerPage < productCount && (
              <div className='d-flex justify-content-center mt-5 paginationC'>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText={`Next`}
                  prevPageText={`Prev`}
                  itemClass='page-item'
                  linkClass='page-link'
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
