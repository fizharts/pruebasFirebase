import Admin from './components/Admin/Admin';
import Login  from './components/Login/Login';
import { Contenedor } from './components/Contenedor';
import './App.css';
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './config/fireBase';
import NavBar from './components/NavBar/NavBar';

export const App = ()=> {
  const [firebaseUser, setFirebaseUser] = useState(false)

    useEffect( () => {
      auth.onAuthStateChanged(user => {
        console.log(user)

        if( user ){
          setFirebaseUser( user )
        }else{
          setFirebaseUser( null )
        }
      })
    } , [])
  return firebaseUser !== false ? (
    <Router>
    <Fragment>
    <NavBar  firebaseUser = { firebaseUser } />

      <Switch>
        <Route
          path="/"
          component={ Contenedor }
          exact
        />
        <Route 
          path="/login"
          component={ Login }
          exact
        />
        <Route 
          path="/admin"
          component={ Admin }
          />
      </Switch> 
    </Fragment>
    </Router>
  ):(
    <p> cargando... </p>
  )
}


