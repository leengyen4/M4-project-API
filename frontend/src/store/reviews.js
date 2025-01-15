import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';
const CLEAR_REVIEWS = 'reviews/clearReviews';
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/Delete'

const getReview = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS
    };
};

const createReview = (newReview) => {
    return {
        type: CREATE_REVIEW,
        payload: newReview
    }
}

const deletedReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId
  }
}

export const getReviews = (spotId) => async (dispatch) => {
    dispatch(clearReviews());
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getReview(data.Reviews));
    }
};

export const postReview = (spotId, newReview) => async (dispatch, getState) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const data = await response.json();
        const state = getState();
        const user = state.session.user;

        const reviewPayload = {
          ...data,
          User: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };

        dispatch(createReview(reviewPayload));
        return reviewPayload;
      } else {
        const errorData = await response.json();
        return { error: errorData.message || 'Failed to post review' };
      }
    } catch (error) {
      return { error: error.message || 'Failed to post review' };
    }
  };

  export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deletedReview(reviewId));
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
    }
};

const initialState = { reviews: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state };
            action.reviews.forEach(review => {
                newState.reviews[review.id] = review;
            });
            return newState;
        }
        case CLEAR_REVIEWS: {
            return { reviews: {} };
        }
        case CREATE_REVIEW: {
            const newState = { ...state }
            newState.reviews = { ...state.reviews, [action.payload.id]: action.payload };
            return newState
        }
        case DELETE_REVIEW: {
          const newState = { ...state };
          delete newState.reviews[action.payload];
          return newState;
      }
        default: {
            return state;
        }
    }
};

export default reviewReducer;
