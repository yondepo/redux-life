import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as boardActions from '../actions/boardActions';
import BoardSVG from './boardSVG/BoardSVG';
import BoardTD from './boardTD/BoardTD';
import Toolbar from './profile/Toolbar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateView = this.updateView.bind(this);
  }

  componentWillMount() {
    this.updateView();
  }
  componentDidMount() {
      window.addEventListener("resize", this.updateView);
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateView);
  }

  updateView() {
    let winWidth = window.innerWidth;
    this.props.actions.resizeView(winWidth);
  }

  render() {
    return (
      <div>
        <h1 className="title">Conway's Game of Life</h1>
        <Toolbar
          profile={this.props.profile}
          actions={this.props.actions}
          cells={this.props.board.grid
            .reduce((arr, row) => arr.concat(row))
            .reduce((sum, cell) => sum + cell)}
          size={this.props.board.grid.length} />
        <BoardSVG
          board={this.props.board}
          toggle={this.props.actions.toggle}/>
      </div>
    );
  }
}

App.propTypes = {
  board: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    board: state.board,
    profile: state.profile
  }),
  (dispath) => ({
    actions: bindActionCreators(boardActions, dispath)
  })
)(App);
