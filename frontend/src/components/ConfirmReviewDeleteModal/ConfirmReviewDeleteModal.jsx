import { useModal } from "../../context/modal"
import { deleteReview } from "../../store/reviews"
import { useDispatch } from "react-redux"
import './ConfirmReviewDelete.css'

function ConfirmReviewDeleteModal ({reviewId}) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const handleDelete = async (reviewId) => {
        await dispatch(deleteReview(reviewId));
        closeModal();
    }

    return (
        <div className="review-delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <div id="button-wrap">
                <button id="delete-button" onClick={() => handleDelete(reviewId)}>Yes (Delete Review)</button>
                <button id="cancel-delete" onClick={() => closeModal()}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default ConfirmReviewDeleteModal
