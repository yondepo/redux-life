import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../actions/gridActions';
import Grid from './grid/Grid';
import Toolbar from './profile/Toolbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">Conway's Game of Life</h1>
        <Toolbar
          profile={this.props.profile}
          clear={this.props.actions.clear}
          tick={this.props.actions.tick}
          start={this.props.actions.start}
          stop={this.props.actions.stop}
          resize={this.props.actions.resize}
          cells={this.props.grid
            .reduce((arr, row) => arr.concat(row))
            .reduce((sum, cell) => sum + cell)}
          size={this.props.grid.length}/>
        <Grid grid={this.props.grid} toggle={this.props.actions.toggle}/>
      </div>
    );
  }
}

App.propTypes = {
  grid: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    grid: state.grid,
    profile: state.profile
  }),
  (dispath) => ({
    actions: bindActionCreators(gridActions, dispath)
  })
)(App);
