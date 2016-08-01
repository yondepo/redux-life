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
    if (this.isEnd()) return;
    tick({
      frame: window.requestAnimationFrame(() => this.start(tick))
    });
  }

  stop() {
    window.cancelAnimationFrame(this.props.profile.frame);
    this.props.stop();
  }

  render() {
    const {profile, tick, cells, size, resize} = this.props;
    const options = [
      { label: 'Small size', size: 30 },
      { label: 'Medium size', size: 45},
      { label: 'Large size', size: 60 }
    ];
    const selected = size;

    return (
      <div>
        <div className="toolbar">
          <Select
            options={options}
            selected={selected}
            action={resize}/>
        </div>
        <div className="toolbar">
          <Button
            onclick={this.next}
            label={'NEXT'}
            fa={'step-forward'}/>
          <Button
            onclick={this.toggleAuto(tick)}
            label={profile.running
                ? 'STOP'
                : 'START'}
            fa={profile.running
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
  size: PropTypes.number.isRequired
};

export default Toolbar;
