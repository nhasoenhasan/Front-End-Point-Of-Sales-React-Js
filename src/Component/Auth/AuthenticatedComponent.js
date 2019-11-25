import React, { useEffect } from 'react';
import {withRouter} from  'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import jwt from '../../Helpers/Jwt'

const AuthenticatedComponent =(props)=>{

    const isLoading = useSelector(state => state.auth.isLoading)
    const token = localStorage.getItem("x-access-token");   

    useEffect(()=>{

        if(!token){
            props.history.push('/');
        }else{
            props.history.push('/dashboard');
        }   
    });

    
    if(!jwt){
        return (
            props.history.push('/')
        );
    }else{
        return (
            props.history.push('/dashboard')
        );
    }
}

export default withRouter(AuthenticatedComponent);
