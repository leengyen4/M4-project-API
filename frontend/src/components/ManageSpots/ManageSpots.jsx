import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserSpots } from "../../store/spots"
import { useNavigate } from "react-router-dom"
// import { NavLink } from "react-router-dom"
import './ManageSpots.css'
import OpenModalButton from "../OpenModalButton"
import ConfirmSpotDeleteModal from "../ConfirmSpotDeleteModal/ConfirmSpotDeleteModal"


function ManageSpots() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const spots = useSelector(state => Object.values(state.spot.userSpots))

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch, spots.length])

    const handleSpotClick = (spotId) => {
        navigate(`/spots/${spotId}`)
    }

    const handleUpdate = (spotId) => {
        navigate(`/spots/${spotId}/update`)
    }



    return (
        <div className="manage-page">
            <h1>Manage Your Spots</h1>
            <div className="spots-grid">
                {spots.map(spot => (
                    <div className="manage-spot-tile" key={spot.id}>
                        <div key={spot.id} className="spot-card" onClick={() => handleSpotClick(spot.id)}>
                            <img src={spot.previewImage} alt={spot.name} />
                            <div className="spot-info">
                                <div className="tooltip">{spot.name}</div>
                                <div className="spot-location">
                                    <p>{spot.city}, {spot.state}</p>
                                    <p className="spot-rating">★ {spot.avgStarRating || "New"}</p>
                                </div>
                                <p className="spot-price">${spot.price} / night</p>
                            </div>
                        </div>

                        <div className="button-wrapper">
                            <button onClick={() => handleUpdate(spot.id)}>Update</button>
                            <OpenModalButton buttonText={'Delete'} modalComponent={<ConfirmSpotDeleteModal spotId={spot.id} />} />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageSpots
