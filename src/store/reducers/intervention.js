import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const initialState = {
    interventions: [],
    
    title: '',
    avatar: '',
    price: '',
    description: '',
    
    loading: false,
    success: false,
    error: null
};

const getAllIntersStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
};
const getAllIntersSuccess = (state, action) => {
    return updateObject(state, { interventions: action.interventions, loading: false, error: null });
};
const getAllIntersFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};
////////////////////////////////////////

const deleteInterStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
};
const deleteInterSuccess = (state, action) => {
    return updateObject(state, {
        interventions: state.interventions.filter(inter => inter.id !== action.id),
        loading: false,
        error: null
    });
};
const deleteInterFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};
////////////////////////////////////////

const addInterStart = (state, action) => {
    return updateObject(state, { loading: true, success: false, error: null });
};
const addInterSuccess = (state, action) => {
    return updateObject(state, { loading: false, success: true, error: null });
};
const addInterFail = (state, action) => {
    return updateObject(state, { loading: false, success: false, error: action.error });
};
////////////////////////////////////////

const editInterStart = (state, action) => {
    return updateObject(state, { loading: true, success: false, error: null });
};
const editInterSuccess = (state, action) => {
    return updateObject(state, { loading: false, success: true, error: null });
};
const editInterFail = (state, action) => {
    return updateObject(state, { loading: false, success: false, error: action.error });
};
////////////////////////////////////////

const getInterByIdStart = (state, action) => {
    return updateObject(state, { loading: true, success: false, error: null });
};
const getIntervByIdSuccess = (state, action) => {
    return updateObject(state, {
        title: action.interById.title,
        avatar: action.interById.avatar,
        price: action.interById.price,
        description: action.interById.description,
        loading: false,
        error: null
    });
};
const getInterByIdFail = (state, action) => {
    return updateObject(state, { loading: true, error: action.error });
};

const inputChanged = (state, action) => {
    const { name, value } = action.event.target;
    return updateObject(state, {
        [name]: value
    });
};
////////////////////////////////////////

const resetState = (state, action) => {
    return updateObject(state, {
        loading: false,
        success: false,
        error: null
    });
};
////////////////////////////////////////

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_ALL_INTERVENTIONS_START: return getAllIntersStart(state, action);
        case actionTypes.GET_ALL_INTERVENTIONS_SUCCESS: return getAllIntersSuccess(state, action);
        case actionTypes.GET_ALL_INTERVENTIONS_FAIL: return getAllIntersFail(state, action);

        case actionTypes.DELETE_INTERVENTION_START: return deleteInterStart(state, action);
        case actionTypes.DELETE_INTERVENTION_SUCCESS: return deleteInterSuccess(state, action);
        case actionTypes.DELETE_INTERVENTION_FAIL: return deleteInterFail(state, action);

        case actionTypes.ADD_INTERVENTION_START: return addInterStart(state, action);
        case actionTypes.ADD_INTERVENTION_SUCCESS: return addInterSuccess(state, action);
        case actionTypes.ADD_INTERVENTION_FAIL: return addInterFail(state, action);

        case actionTypes.EDIT_INTERVENTION_START: return editInterStart(state, action);
        case actionTypes.EDIT_INTERVENTION_SUCCESS: return editInterSuccess(state, action);
        case actionTypes.EDIT_INTERVENTION_FAIL: return editInterFail(state, action);

        case actionTypes.GET_INTERVENTION_BY_ID_START: return getInterByIdStart(state, action);
        case actionTypes.GET_INTERVENTION_BY_ID_SUCCESS: return getIntervByIdSuccess(state, action);
        case actionTypes.GET_INTERVENTION_BY_ID_FAIL: return getInterByIdFail(state, action);

        case actionTypes.INPUT_CHANGED: return inputChanged(state, action);

        case actionTypes.RESET_STATE: return resetState(state, action);

        default: return state;
    }

};

export default reducer;