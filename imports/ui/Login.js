import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
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

    Meteor.loginWithPassword({ email }, password, (error) => {
      if (error) {
        this.setState({ error: 'Hmmm, I can\'t let you in. You just gave me wrong email or password.' });
        setTimeout(() => {
          this.setState({ error: '' });
        }, 3000);
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Link Dwarfer</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input type="email" placeholder="Email" name="email" ref={(email) => { this.email = email; }} />
            <input type="password" name="password" placeholder="Password" ref={(password) => { this.password = password; }} />
            <button className="button" type="submit">Let me in!</button>
          </form>

          <Link to="/signup">You don&apos;t have an account, eh?</Link>
        </div>
      </div>
    );
  }
}
