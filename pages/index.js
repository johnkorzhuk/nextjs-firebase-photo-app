// @flow

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import styled from 'styled-components';
import axios from 'axios';

import SignIn from '../components/SignIn';
import CurrentUser from '../components/CurrentUser';
import ProfileCard from '../components/ProfileCard';

import { auth, database } from '../firebase';
import initStore from '../store/store';

const Container = styled.div`
  margin: auto;
  width: 800px;
`;

const Header = styled.header``;

const ProfileCards = styled.section`
  display: flex;
  margin: 1em 0;
  justify-content: center;
  flex-wrap: wrap;
`;

type Props = {
  origUser: null | FirebaseUser,
  origUsers: null | Users
};

class Index extends Component {
  static async getInitialProps({ req }) {
    const origUser = req && req.session ? req.session.user : null;
    const origUsers = req && req.session ? req.session.users : null;

    return { origUser, origUsers };
  }

  state = {
    user: this.props.origUser,
    users: this.props.origUsers
  };

  componentDidMount() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        await axios.post('/api/login', {
          token
        });

        // the user from getInitialProps (firebase-admin) is different than this user (firebase)
        this.setState({ user });

        this.userRef = this.usersRef.child(user.uid);

        const snap = await this.userRef.once('value');

        if (!snap.val()) {
          const { displayName, photoURL, email } = user;

          if (this.userRef) {
            this.userRef.set({
              displayName,
              photoURL,
              email
            });
          }
        }

        this.usersRef.on('value', _snap => {
          // todo: this should fire when the file in ProfileCard gets uploaded.
          this.setState({
            users: _snap.val()
          });
        });
      } else {
        this.setState({ user: null });

        await axios.post('/api/logout');
      }
    });
  }

  userRef = null;
  usersRef = database.ref('/users');

  props: Props;

  render() {
    const { user, users } = this.state;

    return (
      <Container>
        <Header>
          <h1>Photos</h1>
          <div>
            {!user && <SignIn />}
            {user &&
              <div>
                {users &&
                  <ProfileCards>
                    {Object.keys(users).map(userKey =>
                      <ProfileCard key={userKey} uid={userKey} user={users[userKey]} />
                    )}
                  </ProfileCards>}
                <CurrentUser user={user} />
              </div>}
          </div>
        </Header>
      </Container>
    );
  }
}

export default withRedux(initStore)(Index);
