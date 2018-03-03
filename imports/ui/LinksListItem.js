import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      justCopied: false,
      canCopy: true,
    };
    this.onHide = this.onHide.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderUnableToCopy = this.renderUnableToCopy.bind(this);
  }

  /*
    Copy the url when the component first render
    And change the button text
  */
  componentDidMount() {
    this.clipboard = new Clipboard(this.btnCopy);

    this.clipboard.on('success', () => {
      this.setState({
        justCopied: true,
      });
      setTimeout(() => {
        this.setState({
          justCopied: false,
        });
      }, 800);
    }).on('error', () => {
      this.setState({
        canCopy: false,
      });
    });
  }

  // Clean the browser memory by destroying the clipboard object
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  onHide() {
    Meteor.call('links.setVisibility', this.props._id, !this.props.isVisible);
  }

  onDelete() {
    Meteor.call('links.delete', this.props._id);
  }

  renderStats() {
    let visitedCountMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    visitedCountMessage = this.props.visitedCount === 0 ? null : `${this.props.visitedCount} ${visitedCountMessage}`;
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }

    return (
      <p className="item__message item__message-status">{visitedCountMessage} {visitedMessage}</p>
    );
  }

  renderUnableToCopy() {
    if (!this.state.canCopy) {
      return (<p>Your browser doesn&apos;t support this feature, please copy it manually</p>);
    }

    return null;
  }

  render() {
    return (
      <div className="item">
        <h3>{this.props.url}</h3>
        <p className="item__message">Description: {this.props.description ? this.props.description : '-'}</p>
        <p className="item__message">ShortURL {this.props.shortUrl}</p>
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          href={this.props.shortUrl}
          target="_blank"
        >
          Visit
        </a>
        <button className="button button--pill" data-clipboard-text={this.props.shortUrl} ref={(btnCopy) => { (this.btnCopy = btnCopy); }}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" onClick={this.onHide}>{this.props.isVisible ? 'Hide' : 'Unhide'}</button>
        <button className="button button--pill" onClick={this.onDelete}>Delete</button>
        {this.renderUnableToCopy()}
      </div>
    );
  }
}

LinksListItem.defaultProps = {
  lastVisitedAt: null,
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
};
