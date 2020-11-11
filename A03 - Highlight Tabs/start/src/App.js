import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import Tab from './components/Tab';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';

function App() {

  return (
    <Router>
      <div className="app">
        <div className="browser">
          <div className="tabs">
            <Tab>
              <NavLink activeClassName="is-active" to="/" exact={true}>Home</NavLink>
            </Tab>
            <Tab>
              <NavLink activeClassName="is-active" to="/about">About</NavLink>
            </Tab>
            <Tab>
              <NavLink activeClassName="is-active" to="/features">Features</NavLink>
            </Tab>
          </div>

          <div className="viewport">
              <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/features">
                    <Features />
                </Route>
                <Route path="/" exact={true}>
                    <Home />
                </Route>
              </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
