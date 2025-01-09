import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../store/reviews';
import styles from './PostReview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../context/modal';

function PostReviewModal({ spotId }) {
    const dispatch = useDispatch();
    const modalRef = useRef();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [backendError, setBackendError] = useState('');

    const handleReviewPost = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            review,
            stars: rating
        };

        const response = await dispatch(postReview(spotId, reviewPayload));

        if (response.error) {
            setBackendError(response.error);
        } else {
            closeModal();
        }
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const isSubmitDisabled = review.length < 10 || rating === 0;

    return (
        <div className={styles.modalContainer}>
            <main className={styles.reviewBox} ref={modalRef}>
                <h2>How was your stay?</h2>
                {backendError && <p className={styles.backendError}>{backendError}</p>}
                <textarea
                    className={styles.reviewText}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Just a quick review."
                />
                <div className={styles.starRating}>
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={index < rating ? solidStar : regularStar}
                            onClick={() => handleStarClick(index)}
                            className={styles.star}
                        />
                    ))}
                    <span className={styles.starsLabel}>Stars</span>
                </div>
                <button
                    onClick={handleReviewPost}
                    className={styles.postReviewButton}
                    disabled={isSubmitDisabled}
                >
                    Submit Your Review
                </button>
            </main>
        </div>
    );
}

export default PostReviewModal;
