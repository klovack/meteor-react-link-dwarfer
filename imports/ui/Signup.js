import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();
    const passwordLength = 6;

    if (password.length < passwordLength) {
      return this.setState({ error: `1... 2... 3... Eh your password is less than ${passwordLength} characters.` });
    }

    Accounts.createUser({ email, password }, (error) => {
      if (error) {
        if (error.error === 403) {
          this.setState({ error: 'There\'s someone i know using that email' });
        } else {
          this.setState({ error: error.error });
        }
        setTimeout(() => {
          this.setState({ error: '' });
        }, 3000);
      } else {
        this.setState({ error: '' });
      }
    });

    return true;
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Link Dwarfer</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input type="email" placeholder="Email" name="email" ref={(email) => { this.email = email; }} />
            <input type="password" name="password" placeholder="Password" ref={(password) => { this.password = password; }} />
            <button className="button" type="submit">Let me join!</button>
          </form>

          <p>Ohoho, so you already have one. <Link to="/">Show me!</Link></p>
        </div>
      </div>
    );
  }
}
