import axios from '../../axios-instance';
import * as actionTypes from './actionTypes';

export const getAllDataStart = () => {
    return {
        type: actionTypes.GET_ALL_INTERVENTIONS_START
    };
};
export const getAllDataSuccess = data => {
    return {
        type: actionTypes.GET_ALL_INTERVENTIONS_SUCCESS,
        interventions: data
    };
};
export const getAllDataFail = error => {
    return {
        type: actionTypes.GET_ALL_INTERVENTIONS_FAIL,
        error: error
    };
};
export const getAllInterventions = token => {
    return dispatch => {
        dispatch(getAllDataStart());
        axios.get('/v1/articles')
            .then(res => {
                let fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key]
                    });
                }
                dispatch(getAllDataSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(getAllDataFail(err));
            });
    };
};
////////////////////////////////////////

const deleteDataStart = () => {
    return {
        type: actionTypes.DELETE_INTERVENTION_START
    };
};
const deleteDataSuccess = id => {
    return {
        type: actionTypes.DELETE_INTERVENTION_SUCCESS,
        id: id
    };
};
const deleteDataFail = error => {
    return {
        type: actionTypes.DELETE_INTERVENTION_FAIL,
        error: error
    };
};
export const deleteIntervention = (id, token) => {
    return dispatch => {
        deleteDataStart();
        axios.delete('/v1/articles/' + id)
            .then(res => {
                dispatch(deleteDataSuccess(id));
            })
            .catch(err => {
                deleteDataFail(err);
            });
    };
};
////////////////////////////////////////

export const addDataStart = () => {
    return {
        type: actionTypes.ADD_INTERVENTION_START
    };
};
export const addDataSuccess = () => {
    return {
        type: actionTypes.ADD_INTERVENTION_SUCCESS
    };
};
export const addDataFail = error => {
    return {
        type: actionTypes.ADD_INTERVENTION_FAIL,
        error: error
    };
};
export const addIntervention = (annonce, token) => {
    return dispatch => {
        dispatch(addDataStart());
        axios.post('/v1/articles/', annonce)
            .then(res => {
                dispatch(addDataSuccess());
            })
            .catch(err => {
                dispatch(addDataFail(err));
            });
    };
};
////////////////////////////////////////

export const editDataStart = () => {
    return {
        type: actionTypes.EDIT_INTERVENTION_START
    };
};
export const editDataSuccess = () => {
    return {
        type: actionTypes.EDIT_INTERVENTION_SUCCESS
    };
};
export const editDataFail = error => {
    return {
        type: actionTypes.EDIT_INTERVENTION_FAIL,
        error: error
    };
};
export const editIntervention = (newIntervention, id, token) => {
    return dispatch => {
        dispatch(editDataStart());
        axios.put('/v1/articles/' + id, newIntervention)
            .then(res => {
                dispatch(editDataSuccess());
            })
            .catch(err => {
                dispatch(editDataFail(err));
            });
    };
};
////////////////////////////////////////

export const getDataByIdStart = () => {
    return {
        type: actionTypes.GET_INTERVENTION_BY_ID_START
    };
};
export const getDataByIdSuccess = data => {
    return {
        type: actionTypes.GET_INTERVENTION_BY_ID_SUCCESS,
        interById: data
    };
};
export const getDataByIdFail = err => {
    return {
        type: actionTypes.GET_INTERVENTION_BY_ID_FAIL,
        error: err
    };
};
export const getInterventionById = (id, token) => {
    return dispatch => {
        dispatch(getDataByIdStart());
        axios.get('/v1/articles/' + id)
            .then(res => {
                dispatch(getDataByIdSuccess(res.data));
            })
            .catch(err => {
                dispatch(getDataByIdFail(err));
            });
    };
};

export const inputChanged = event => {
    return {
        type: actionTypes.INPUT_CHANGED,
        event: event
    };
};
export const inputChangedHandler = event => {
    return inputChanged(event);
};
////////////////////////////////////////

export const reset = () => {
    return {
        type: actionTypes.RESET_STATE
    };
};
export const resetState = () => {
    return reset();
};