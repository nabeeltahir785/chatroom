import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatComponent from './components/ChatComponent';
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/chat" component={ChatComponent} />
        </Switch>
      </Router>
  );
};

export default App;
