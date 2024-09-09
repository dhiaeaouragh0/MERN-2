import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Import useSelector
import { newReview } from '../../actions/productActions';  
import { useAlert } from 'react-alert';  // Importing useAlert for alerts

const NewReview = () => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);  // The user's selected rating
    const [hoverRating, setHoverRating] = useState(0);  // The star highlighted on hover
    const [comment, setComment] = useState('');  // User's review comment

    const { error: success } = useSelector((state) => state.newReview || {});

    const dispatch = useDispatch();
    const alert = useAlert();  // For showing alerts
    const { id } = useParams();  // Get the product ID from URL
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        if (success) {
            setShowModal(false);  // Close modal after submission
        }
    }, [dispatch, success, alert]);



    // Handle the user clicking on a star
    const handleRatingClick = (value) => {
        setRating(value);
    };

    // Handle mouse entering a star (hover effect)
    const handleMouseOver = (value) => {
        setHoverRating(value);
    };

    // Handle mouse leaving the stars (removing hover effect)
    const handleMouseOut = () => {
        setHoverRating(0);
    };

    // Dynamically render the star elements
    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <li
                    key={index}
                    onClick={() => handleRatingClick(starValue)}
                    onMouseOver={() => handleMouseOver(starValue)}
                    onMouseOut={handleMouseOut}
                    style={{ cursor: 'pointer', fontSize: '20px', display: 'inline-block', marginRight: '5px' }}
                >
                    <i
                        className={`fa fa-star ${starValue <= (hoverRating || rating) ? 'checked' : ''}`}
                    ></i>
                </li>
            );
        });
    };

    // Review submission handler
    const reviewHandler = () => {
        const formData = new FormData();
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);

        // Dispatch the review action
        dispatch(newReview(formData));
    };

    return (
        <div>
            {/* Button to open the modal */}
            <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                onClick={openModal}
            >
                Submit Your Review
            </button>

            {/* Modal for submitting the review */}
            {showModal && (
                <div className="modal fade show mt-5" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Submit Review</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <div className='test-content'>
                                            <ul className="vertical-list">
                                                {renderStars()}  {/* Render star rating */}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Review</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button id='close_review' type="button" className="btn btn-primary" onClick={closeModal}>
                                    Close
                                </button>
                                <button
                                    id='submit_review'
                                    type="button"
                                    className="btn btn-primary "
                                    onClick={reviewHandler}  // Call reviewHandler on submit
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop for closing */}
            {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}
        </div>
    );
};

export default NewReview;
