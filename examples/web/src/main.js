import React from 'react';
import ReactDOM from 'react-dom';

import Examples from './Examples';
import './styles/main.css';

import startup from './startup';

class Loader extends React.Component {
  constructor() {
    super();
    this.state = {loaded: false};
  }
  componentWillMount() {
    startup();
  }
  render() {

    return <Examples />;
  }
}

ReactDOM.render((
    <Loader />
), document.getElementById('root'));
