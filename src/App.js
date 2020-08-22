import React from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import Mainpage from "./components/Mainpage";

function App() {

  return (
      <Switch>
        <Route path="/" component={Mainpage}/>
      </Switch>
  );
}

export default App;
