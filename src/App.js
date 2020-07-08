import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/movie/:id' component={MovieDetail}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
