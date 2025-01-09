import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";
const GET_USER_SPOTS = '/spots/currentUser'
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = '/spots/updateSpot'
const CLEAR_USER_SPOTS = 'spots/clearUserSpots';
const ADD_IMAGE = 'spots/addImage';
const DELETE_SPOT = 'spots/delete'

const getSpot = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const getUserSpot = (userSpots) => {
    return {
        type: GET_USER_SPOTS,
        payload: userSpots
    }
}

const spotDetails = (spotDetail) => {
    return {
        type: GET_SPOT_DETAILS,
        spotDetail
    };
};

const createSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}

const updateSpot = (updatedSpot) => {
    return {
        type: UPDATE_SPOT,
        payload: updatedSpot
    }
}

const deletedSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        payload: spotId
    }
}

const clearUserSpots = () => {
    return {
        type: CLEAR_USER_SPOTS,
    };
};

const addImage = (image) => ({
    type: ADD_IMAGE,
    image,
})

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpot(data.Spots));
    }
}

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserSpot(data.Spots))
    }
}

export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(spotDetails(data));
    }
}

export const createNewSpot = (newSpot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpot)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createSpot(data))
        return data;
    }
}

export const updatedSpot = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateSpot(data))
        return data
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deletedSpot(spotId))
    } else {
        console.error("Failed to delete spot");
    }

}

export const addImageToSpot = (spotId, url, preview) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, preview }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addImage({ ...data, spotId }));
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add image');
    }
};

const initialState = { spots: {}, currentSpot: {}, spotImages: {}, userSpots: {} };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state };
            action.spots.forEach(spot => {
                newState.spots[spot.id] = spot;
            });
            return newState;
        }
        case GET_USER_SPOTS: {
            const newState = { ...state }
            action.payload.forEach(spot => {
                newState.userSpots[spot.id] = spot;
            })
            return newState;
        }
        case GET_SPOT_DETAILS: {
            const newState = { ...state };
            newState.currentSpot = action.spotDetail;
            newState.spots[action.spotDetail.id] = action.spotDetail;
            return newState;
        }
        case CREATE_SPOT: {
            const newState = { ...state, spots: { ...state.spots } };
            newState.spots[action.newSpot.id] = action.newSpot;
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = { ...state, spots: { ...state.spots } };
            newState.spots[action.payload.id] = action.payload;
            if (newState.userSpots[action.payload.id]) {
                newState.userSpots[action.payload.id] = action.payload;
            }
            return newState;
        }
        case DELETE_SPOT: {
            const newState = {
                ...state,
                userSpots: { ...state.userSpots },
                spots: { ...state.spots }
            };
            delete newState.userSpots[action.payload];
            delete newState.spots[action.payload];
            return newState;
        }
        case CLEAR_USER_SPOTS: {
            return { ...state, userSpots: {} };
        }
        case ADD_IMAGE: {
            const newState = { ...state };
            const spotId = action.image.spotId;
            if (!newState.spotImages[spotId]) {
                newState.spotImages[spotId] = [];
            }
            newState.spotImages[spotId].push(action.image);
            return newState;
        }
        default: {
            return state;
        }
    }
};


export default spotReducer;
export { clearUserSpots }
