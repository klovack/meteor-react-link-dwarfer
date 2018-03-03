import React from 'react';
import PropTypes from 'prop-types';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true,
    };
    this.onToggleHide = this.onToggleHide.bind(this);
  }

  componentDidMount() {
    // Make sure that the state always listen for changes
    this.hiddenLinksTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: this.props.linksDict.get('showVisible'),
      });
    });
  }

  componentWillUnmount() {
    this.hiddenLinksTracker.stop();
  }

  onToggleHide(event) {
    if (this.props.linksDict) {
      this.props.linksDict.set('showVisible', !event.target.checked);
    }
  }

  render() {
    return (
      <div>
        <label className="checkbox" htmlFor="toggleHide">
          <input
            className="checkbox__box"
            type="checkbox"
            id="toggleHide"
            name="toggleHide"
            onChange={this.onToggleHide}
            checked={!this.state.showVisible}
          />
          show hidden links
        </label>
      </div>
    );
  }
}

LinksListFilters.propTypes = {
  linksDict: PropTypes.instanceOf(ReactiveDict).isRequired,
};
