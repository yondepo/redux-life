import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Grid from './Grid';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <Grid />
      </div>
    );
  }
}

export default App;
