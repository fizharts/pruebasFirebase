import { Login } from './components/Login/Login';
import { Contenedor } from './components/Contenedor';
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const App = ()=> {
  return (
    <Router>
    <Fragment>
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
      </Switch> 

    </Fragment>
    </Router>
  );
}


