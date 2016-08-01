import React, {PropTypes} from 'react';
import Button from './Button';
import TextLabel from './TextLabel';


class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
    this.next = this.next.bind(this);
  }

  next() {
    this.props.tick({
      frame: null
    });
  }

  clear() {
    if (this.props.profile.running) {
      this.stop();
    }

    this.props.clear();
  }

  toggleAuto(tick) {
    return () => {
      if (this.props.profile.running) {
        return this.stop();
      }

      this.props.start();
      this.start(tick);
    };
  }

  start(tick) {
    tick({
      frame: window.requestAnimationFrame(() => this.start(tick))
    });
  }

  stop() {
    window.cancelAnimationFrame(this.props.profile.frame);
    this.props.stop();
  }

  render() {
    const {profile, tick} = this.props;

    return (
      <div className="toolbar">
        <Button
          onclick={this.next}
          label={'NEXT'}/>
        <Button
          onclick={this.toggleAuto(tick)}
          label={profile.running
              ? 'STOP'
              : 'START'}/>
        <Button
          onclick={this.clear}
          label={'CLEAR'} />
        <TextLabel label={'Generations: ' + profile.ticks} />
      </div>
    );
  }
}

Toolbar.propTypes = {
  tick: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default Toolbar;
