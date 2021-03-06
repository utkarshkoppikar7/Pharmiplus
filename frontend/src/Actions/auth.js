import axios from 'axios'
import {setAlert} from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'

//Load a User

export const loadUser = ()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res= await axios.get('/api/auth')

        dispatch({
            type:USER_LOADED,
            payload: res.data
        })
        localStorage.setItem('user',res.data.email);
        localStorage.setItem('name',res.data.name);
        console.log(res.data);
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })

        
    }

}

//Register a User
export const registerAction = ({name,email,password}) =>async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});

    try {
        const res = await axios.post('/api/users',body,config);
        dispatch( {
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
            
        }

       dispatch({
           type: REGISTER_FAIL
       })
        
    }

};

//Login a user
export const loginAction = (email,password) =>async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth',body,config);
        dispatch( {
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
            
        }

       dispatch({
           type: LOGIN_FAIL
       })
        
    }

};

//LOGOUT //Clear authenciation

export const logoutAction =() => dispatch =>{
    dispatch({type: LOGOUT});
};