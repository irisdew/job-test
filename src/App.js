<<<<<<< HEAD
import React, { useState } from 'react';
import { HashRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

=======
>>>>>>> 75d6dc638a71c231352f80710e16aa666742aa1b
import User from './components/User';
import Intro from './components/Intro';
import Test from './components/Test';
import Result from './components/Result';
<<<<<<< HEAD
=======
import { HashRouter, Route } from "react-router-dom";
import './App.css';
>>>>>>> 75d6dc638a71c231352f80710e16aa666742aa1b

function App() {


  return (
      <>
      <HashRouter>
        <Route path='/' exact={true} component={User} />
        <Route path='/intro' component={Intro} />
        <Route path='/test' component={Test} />
        <Route path='/result' component={Result} />
      </HashRouter>
      </>
  );
}

export default App;
