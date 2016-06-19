import React from 'react';
import { createHistory } from 'history';

import containers from './containers';
import classNames from 'classnames';

const history = createHistory();

export default class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.handleHistoryChange = this.handleHistoryChange.bind(this);

    this.state = {
      selected: 'simple',
    };
  }

  componentDidMount() {
    this.unlistenHistory = history.listen(this.handleHistoryChange);
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  handleHistoryChange({ hash }) {
    const fullPath = hash.replace('#', '');
    const pth = fullPath.split('-');
    if (pth && pth[0]) {
      this.setState({
        selected: pth[pth.length - 1],
      },() => window.scrollTo(0, 0));
    }
  }

  renderNavBarExamples() {
    const { selected } = this.state;

    return (
      <div className="nav navbar-nav">
        {
          Object.keys(containers).map(exampleName => {
            return (
              <a href={`#${exampleName}`} key={ exampleName }
                className={ classNames(selected === exampleName ? 'selected' : '', 'nav-item nav-link') }
              >
                { containers[exampleName].title }
              </a>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { selected } = this.state;
    const { Component, FormComponent, containerName, formName, title, description, props } = containers[selected];

    return (
      <div className="app">
        <nav className="navbar navbar-dark bg-inverse">
          <div className="navbar-wrapper container">
            { this.renderNavBarExamples() }
          </div>
        </nav>
        <div className="layout container">
          <div className="examples">
            <h2> { title } </h2>
            <p className="page-description" dangerouslySetInnerHTML={{ __html: description }} />
            <div className="example">
              <div className="card example-container">

                <div className="card-block">
                  <Component Form={FormComponent} {...props} />
                </div>
              </div>
              <div className="row">
                <div className="example-code col-xs-12">
                  <h3>Form Code</h3>
                  <pre>
                    <code className="language-jsx code">
                      { require(`!raw!./forms/${formName}.js`) }
                    </code>
                  </pre>
                </div>
                <div className="example-code col-xs-12">
                  <h3>Container Code</h3>
                  <pre>
                    <code className="language-jsx code">
                      { require(`!raw!./containers/${containerName}.js`) }
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
