// import User from './components/User';
// import Intro from './components/Intro';
// import Test from './components/Test';
// import Result from './components/Result';

import React, { useState } from 'react';
import Child from './components/Child';
import ChildResult from './components/ChildResult';

// import { HashRouter, Route } from "react-router-dom";
import './App.css';

function App() {
  const [xxx, setXXX] = useState('초기값');

  const toggleFilter = e => {
    setXXX(e);
  }

  return (
      <>
      <Child toggleFilter={e => toggleFilter(e)}/>
      <ChildResult xxx={xxx} />

      {/* <HashRouter>
        <Route path='/' exact={true} component={User} />
        <Route path='/intro' component={Intro} />
        <Route path='/test' component={Test} />
        <Route path='/result' component={Result} />
      </HashRouter> */}
      </>
  );
}

export default App;
