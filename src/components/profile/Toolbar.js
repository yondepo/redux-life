import React, {PropTypes} from 'react';
import Button from './Button';
import TextLabel from './TextLabel';
import Select from './Select';


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
    this.props.tick({
      frame: 0
    });
  }

  clear() {
    if (this.props.profile.startedAt) {
      this.stop();
    }

    this.props.clear();
  }

  toggleAuto(tick) {
    return () => {
      if (this.props.profile.startedAt) {
        return this.stop();
      }

      this.props.start(Date.now());
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
    this.props.stop();
  }

  render() {
    const {profile, tick, cells, size, resize, changeSlowdown} = this.props;
    const sizeOptions = [
      { label: 'Small size', value: 30 },
      { label: 'Medium size', value: 45},
      { label: 'Large size', value: 60 }
    ];

    const speedOptions = [
      { label: 'Low speed', value: 30 },
      { label: 'Medium speed', value: 10},
      { label: 'High speed', value: 3 },
      { label: 'Maximum speed', value: 1 }
    ];

    return (
      <div>
        <div className="toolbar">
          <Select
            options={sizeOptions}
            selected={size}
            action={resize}/>
          <Select
            options={speedOptions}
            selected={profile.slowdown}
            action={changeSlowdown}/>
          <TextLabel label={'FPS: ' + profile.fps} />
        </div>
        <div className="toolbar">
          <Button
            onclick={this.next}
            label={'NEXT'}
            fa={'step-forward'}/>
          <Button
            onclick={this.toggleAuto(tick)}
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
  tick: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  resize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  cells: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  changeSlowdown: PropTypes.func.isRequired
};

export default Toolbar;
