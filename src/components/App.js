import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../actions/gridActions';
import Grid from './grid/Grid';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <Grid grid={this.props.grid} toggle={this.props.actions.toggle}/>
      </div>
    );
  }
}

App.propTypes = {
  grid: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    grid: state.grid
  }),
  (dispath) => ({
    actions: bindActionCreators(gridActions, dispath)
  })
)(App);
