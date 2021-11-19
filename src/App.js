import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './pages/About';
import Home from './pages/Home';
import SingleCharacterPage from './pages/SingleCharacterPage';
const App = () => {
  return (
    <Router>
      <NavBar />
      <main className="py-3">
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/SingleCharacterPage/:id"
              component={SingleCharacterPage}
            />
            <Route path="/about" component={About} exact />
          </Switch>
        </div>
      </main>
      s
    </Router>
  );
};

export default App;
