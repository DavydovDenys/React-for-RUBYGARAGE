import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Projects from "./components/Projects/Projects";
import Project from './components/Project/Project'


function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <h1>TODO</h1>
        <Route path='/' component={Projects}/>
        <Route path='/projects' component={Project}/>
        {/*<Route path='/projects/:id' component={Projects}/>*/}
        {/*<Projects/>*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
