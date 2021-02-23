import User from './components/User';
import Intro from './components/Intro';
import Test from './components/Test';
import { HashRouter, Route } from "react-router-dom";
import './App.css';

function App() {


  return (
      <>
      <HashRouter>
        <Route path='/' exact={true} component={User} />
        <Route path='/intro' component={Intro} />
        <Route path='/test' component={Test} />
      </HashRouter>
      </>
  );
}

export default App;
