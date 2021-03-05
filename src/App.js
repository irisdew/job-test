import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './Appp.css';

import User from './components/User';
import Sample1 from './components/Sample1';
import Test from './components/Test';
import Completed from './components/Completed';
import Result from './components/Result';

import Test2 from './components/Test2';
import Result2 from './components/Result2';
import Intro from './components/Intro';

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
          <Route path='/1/sample' component={() => <Sample1 />} />
          <Route path='/1/test' component={() => <Test answersHandler={e => answersHandler(e)}/>} />
          <Route path='/completed' component={Completed} />
          <Route path='/1/result' component={() => <Result params={params} answers={answers}/>} />
          
          <Route path='/2/test' component={Test2} />
          <Route path='/2/result' component={Result2} />

          <Route path='/intro' component={Intro} />

        </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;
