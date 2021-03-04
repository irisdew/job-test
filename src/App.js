import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import User from './components/User';
import Intro from './components/Intro';
import Test from './components/Test';
import Test2 from './components/Test2';
import Completed from './components/Completed';
import Result from './components/Result';

function App() {
  const [params, setParams] = useState({});
  const [answers, setAnswers] = useState("");

  const paramsHandler = e => {
    setParams(e);
  }

  const answersHandler = e => {
    setAnswers(e);
  }

  return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true} component={() => <User paramsHandler={e => paramsHandler(e)}/>} />
          <Route path='/intro' component={() => <Intro />} />
          <Route path='/test' component={() => <Test answersHandler={e => answersHandler(e)}/>} />
          <Route path='/test2' component={Test2} />
          <Route path='/completed' component={Completed} />
          <Route path='/result' component={() => <Result params={params} answers={answers}/>} />
        </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;
