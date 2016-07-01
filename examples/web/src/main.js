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
    startup().then(() => this.setState({loaded: true}));
  }
  render() {

    return <Examples />;

    const {loaded} = this.state;
    return !loaded
      ? (<div>loading...</div>)
      : <Examples />;
  }
}

ReactDOM.render((
    <Loader />
), document.getElementById('root'));
