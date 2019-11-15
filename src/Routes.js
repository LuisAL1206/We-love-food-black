import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import authHOC from './utils/authHOC';
import Create from './views/Create';
import Post from './views/Post';
import Update from './views/Update';
import Me from './views/Me';

function Logout (){
    localStorage.removeItem('blogToken');
    console.log('Entre al logout');
    return <Redirect to="/login"/>
}

function Routes() {

    return(
        <>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/create" component={Create}/>
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/logout" component={authHOC(Logout)}/>
            <Route exact path="/update/:id" component={Update} />
             <Route exact path="/me" component={Me} />
            
        </>
    );

} 

export default Routes;