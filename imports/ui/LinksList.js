import React from 'react';
import FlipMove from 'react-flip-move';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';

import Links from '../api/links';
import LinksListItem from './LinksListItem';
import LinksListFilters from './LinksListFilters';

class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
    this.linksDict = new ReactiveDict();
    this.linksDict.set('showVisible', true);
    this.renderLinksListItems = this.renderLinksListItems.bind(this);
  }

  // Load all the links when component mount
  componentDidMount() {
    // Auto fetch links from database
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPublication');
      const links = Links.find({ isVisible: this.linksDict.get('showVisible') }).fetch();
      this.setState({ links });
    });
  }

  // Remove autorun for all links which stay in this class
  componentWillUnmount() {
    this.linksTracker.stop();
    this.linksDict = null;
  }

  // Function to render all links list
  renderLinksListItems() {
    if (this.state.links.length <= 0) {
      return (
        <div className="item">
          <p className="item__status">Uh oh, there&apos;s nothing to show here</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return (
        <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
      );
    });
  }

  render() {
    return (
      <div>
        <LinksListFilters linksDict={this.linksDict} />
        <FlipMove maintainContainerHeight>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default LinksList;
