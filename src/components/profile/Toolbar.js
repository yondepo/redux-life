import React, {PropTypes} from 'react';
import Button from './Button';
import TextLabel from './TextLabel';
import Select from './Select';
import * as options from '../../constants/options';


class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
    this.next = this.next.bind(this);
    this.isEnd = this.isEnd.bind(this);
  }

  isEnd() {
    if (this.props.cells <= 0) {
      this.stop();
      return true;
    }
  }

  next() {
    if (this.isEnd()) return;
    this.props.actions.tick({
      frame: 0
    });
  }

  clear() {
    if (this.props.profile.startedAt) {
      this.stop();
    }

    this.props.actions.clear();
  }

  toggleAuto(tick) {
    return () => {
      if (this.props.profile.startedAt) {
        return this.stop();
      }

      this.props.actions.start(Date.now());
      this.start(tick);
    };
  }

  start(tick) {
    if (this.isEnd()) return;
    tick({
      frame: window.requestAnimationFrame(() => this.start(tick)),
      now: Date.now(),
      slowdown: this.props.profile.slowdown
    });
  }

  stop() {
    window.cancelAnimationFrame(this.props.profile.frame);
    this.props.actions.stop();
  }

  render() {
    const {profile, cells, size, actions} = this.props;


    return (
      <div>
        <div className="toolbar">
          <Select
            options={options.TYPE}
            selected={profile.type.toString()}
            action={actions.changeType}/>
          <Select
            options={options.SIZE}
            selected={size.toString()}
            action={actions.changeLayout}/>
          <Select
            options={options.SPEED}
            selected={profile.slowdown.toString()}
            action={actions.changeSlowdown}/>
          <TextLabel label={'FPS: ' + profile.fps} />
        </div>
        <div className="toolbar">
          <Button
            onclick={this.next}
            label={'NEXT'}
            fa={'step-forward'}/>
          <Button
            onclick={this.toggleAuto(actions.tick)}
            label={profile.startedAt
                ? 'STOP'
                : 'START'}
            fa={profile.startedAt
                ? 'stop'
                : 'play'}/>
          <Button
            onclick={this.clear}
            label={'CLEAR'}
            fa={'refresh'}/>
          <TextLabel label={'Generations: ' + profile.ticks} />
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  actions: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  cells: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};

export default Toolbar;
