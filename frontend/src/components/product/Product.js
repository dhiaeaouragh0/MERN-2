import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({product}) => {

    const truncateDescription = (description) => {
        return description.length > 50 ? description.substring(0, 50) + '...' : description;
    };
    const truncateName = (name) => {
        return name.length > 17 ? name.substring(0, 17) + '...' : name;
    };
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <li key={i}>
                    <i className={`fa fa-star ${i <= rating ? 'checked' : ''}`}></i>
                </li>
            );
        }
        return stars;
    };

  return (
    <div key={product._id} className='content'>
                    <img src={product.images[0].url} alt="Product"/>
                    <h3>{truncateName(product.name)}</h3>
                    <p>{truncateDescription(product.description)}</p>
                    <h6>{product.price} DA</h6>
                    <ul>
                        {renderStars(product.rating)}
                    </ul>
                    <h5>({product.numOfReviews} reviews)</h5>
                    <Link to={`/product/${product._id}`}><button className='buy-btn'>View Details</button></Link>
                </div>
  )
}

export default Product