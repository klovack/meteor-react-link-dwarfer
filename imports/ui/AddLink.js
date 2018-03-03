import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      description: '',
      isOpen: false,
      error: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.disableInputTemporarily = this.disableInputTemporarily.bind(this);
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value.trim(),
    });
  }

  onChangeDesc(e) {
    this.setState({
      description: e.target.value,
    });
  }

  /*
    Prevent default event of sending the form to the server.
    Then inserting the added link to the database, if the link is invalid
    it will give the error state
  */
  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;
    const description = this.state.description.trim();

    Meteor.call('links.insert', url, description, (err) => {
      if (!err) {
        this.setState({
          url: '',
          description: '',
          error: '',
        });
        this.disableInputTemporarily();
      } else {
        this.setState({
          error: err.error,
        });
      }
    });
  }

  onCancel() {
    this.setState({
      url: '',
      description: '',
      isOpen: false,
      error: '',
    });
  }

  onOpen() {
    this.url.focus();
  }

  /*
    Disabling the input temporarily and close the modal after few second.
    Use this only for better user experience
  */
  disableInputTemporarily() {
    this.url.disabled = true;
    this.btnSubmit.disabled = true;
    this.desc.disabled = true;

    setTimeout(() => {
      this.url.disabled = false;
      this.btnSubmit.disabled = false;
      this.desc.disabled = false;
      this.setState({
        isOpen: false,
      });
    }, 600);
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => { (this.setState({ isOpen: true })); }}>+ Add Link</button>
        <Modal
          onAfterOpen={this.onOpen}
          onRequestClose={this.onCancel}
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view__modal"
        >
          <h2>Add Link</h2>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form className="boxed-view__form" onSubmit={this.onSubmit} id="addURL" name="addURL">
            <input
              value={this.state.url}
              type="text"
              ref={(url) => { this.url = url; }}
              name="add-link"
              id="add-link"
              placeholder="URL"
              onChange={this.onChangeUrl}
            />
            <textarea
              placeholder="Description"
              ref={(desc) => { this.desc = desc; }}
              name="description"
              id="URLDescription"
              cols="30"
              rows="10"
              form="addURL"
              value={this.state.description}
              onChange={this.onChangeDesc}
            />
            <button className="button" ref={(btnSubmit) => { this.btnSubmit = btnSubmit; }} type="submit">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.onCancel}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
