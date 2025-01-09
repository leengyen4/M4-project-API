import { useModal } from "../../context/modal";
import { useDispatch } from "react-redux";
import './ConfirmSpotDelete.css'
import { deleteSpot } from "../../store/spots";

function ConfirmSpotDeleteModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (spotId) => {
        console.log('Deleted!')
        dispatch(deleteSpot(spotId))
        closeModal()
    }


    return (
        <div className="delete-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <div className="button-wrap">
                <button onClick={() => handleDelete(spotId)} id="delete-button">Yes (Delete Spot)</button>
                <button onClick={() => closeModal()} id="cancel-delete-button">No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default ConfirmSpotDeleteModal
