import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import User from './components/User';
import Sample1 from './components/Sample1';
import Test from './components/Test';
import Completed from './components/Completed';
import Result from './components/Result';

import Sample2 from './components/Sample2';
import Test2 from './components/Test2';
import Result2 from './components/Result2';
import Intro from './components/Intro';

function App() {
  const [params, setParams] = useState({});
  const [answers, setAnswers] = useState("");
  const [answers2, setAnswers2] = useState("");

  const paramsHandler = e => {
    setParams(e);
  }

  const answersHandler = e => {
    setAnswers(e);
  }

  const answersHandler2 = e => {
    setAnswers2(e);
  }

  return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true} component={() => <User paramsHandler={e => paramsHandler(e)}/>} />
          <Route path='/intro' component={Intro} />
          
          <Route path='/1/sample' component={Sample1} />
          <Route path='/1/test' component={() => <Test answersHandler={e => answersHandler(e)}/>} />
          <Route path='/1/completed' component={() => <Completed type="1"/>} />
          <Route path='/1/result' component={() => <Result params={params} answers={answers}/>} />
          
          <Route path='/2/sample' component={Sample2} />
          <Route path='/2/test' component={() => <Test2 answersHandler={e => answersHandler2(e)}/>} />
          <Route path='/2/completed' component={() => <Completed type="2"/>} />
          <Route path='/2/result' component={() => <Result2 params={params} answers={answers2}/>} />


        </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;
