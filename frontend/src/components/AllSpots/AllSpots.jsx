import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { selectSpots } from "../../store/selectors";
import { useNavigate } from 'react-router-dom'
import './AllSpots.css';

function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(selectSpots);
    const navigate = useNavigate();

    const handleSpotClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    };

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    if (!spots || spots.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <main className="spots-main">
            <div className="spots-grid">
                {spots.map(spot => (
                    <div key={spot.id} className="spot-card" onClick={() => handleSpotClick(spot.id)}>
                        <img src={spot.previewImage} alt={spot.name} />
                        <div className="spot-info">
                            <div className="tooltip">{spot.name}</div>
                            <div className="spot-location">
                                <p>{spot.city}, {spot.state}</p>
                                <p className="spot-rating">★ {spot.avgStarRating || "New"}</p>
                            </div>
                            <div className="price-wrapper">
                            <p className="spot-price">${spot.price} </p>
                            <p className="night">night</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default AllSpots;
