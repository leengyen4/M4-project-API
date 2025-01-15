import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { useParams } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './SpotDetails.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spot.currentSpot);
    const reviews = useSelector(state => Object.values(state.review.reviews));

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId, reviews.length]);

    if (!spot.id) {
        return <div>Loading...</div>;
    }

    const previewImage = spot.SpotImages.find(image => image.preview);
    const otherImages = spot.SpotImages.filter(image => !image.preview).slice(0, 4);

    const numReviews = reviews.length;
    const avgStarRating = numReviews > 0 ? (reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews).toFixed(1) : null;

    const reviewTextForSingularOrPlural = numReviews === 1 ? 'review' : 'reviews';

    return (
        <div className="spot-details">
            <div className="spot-header">
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className="spot-images">
                {previewImage ? (
                    <img className="main-image" src={previewImage.url} alt={spot.name} />
                ) : (
                    otherImages[0] && <img className="main-image" src={otherImages[0].url} alt={spot.name} />
                )}
                <div className="thumbnail-wrapper">
                    {otherImages.map((image, index) => (
                        <img key={index} src={image.url} alt={`${spot.name} ${index + 1}`} />
                    ))}
                </div>
            </div>
            <div className="carousel-container">
                <Swiper modules={[Pagination]} pagination={{ clickable: true }} loop={false}>
                    {spot.SpotImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image.url} alt={`${spot.name} ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='wrapper'>
                <div className="spot-hosted">
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p className='spot-description'>{spot.description}</p>
                </div>
                <div className="spot-reserve">
                    <div className="price-and-rating">
                        <p className="spot-price">${spot.price}
                            <p id='night'>night</p>
                        </p>
                        <p className="spot-rating">
                            <FontAwesomeIcon icon={solidStar}/> {avgStarRating || 'New'}
                            {numReviews > 0 && ` · ${numReviews} ${reviewTextForSingularOrPlural}`}
                        </p>
                    </div>
                    <button onClick={() => alert('Feature coming soon')}>Reserve</button>
                </div>
            </div>
            <div className="spot-reviews">
                <p id='bottom-rating'>
                    <FontAwesomeIcon icon={solidStar}/> {avgStarRating || 'New'}
                    {numReviews > 0 && ` · ${numReviews} ${reviewTextForSingularOrPlural}`}
                </p>
                <Reviews spotId={spotId} ownerId={spot.ownerId}/>
            </div>
        </div>
    );
}

export default SpotDetails;
