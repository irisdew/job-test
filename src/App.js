import React, { useState } from 'react';
import { HashRouter, Route } from "react-router-dom";

import User from './components/User';
import Intro from './components/Intro';
import Test from './components/Test';
import Completed from './components/Completed';
import Result from './components/Result';

import './App.css';

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
      <HashRouter>
        <Route path='/' exact={true} component={() => <User paramsHandler={e => paramsHandler(e)}/>} />
        <Route path='/intro' component={() => <Intro />} />
        <Route path='/test' component={() => <Test answersHandler={e => answersHandler(e)}/>} />
        <Route path='/completed' component={Completed} />
        <Route path='/result' component={() => <Result params={params} answers={answers}/>} />
      </HashRouter>
      </>
  );
}

export default App;
