// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { auth } from '../firebase';

const Container = styled.div`
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const Photo = styled.img`
  max-height: 150px;
  min-width: 150px;
`;

const Identification = styled.div`
  padding: 1em;
  flex: 1;
`;

type Props = {
  user: FirebaseUser
};

class CurrentUser extends PureComponent {
  shouldComponentUpdate(nextProps: Props) {
    // see index.js's cdm function
    if (this.props.user.uid === nextProps.user.uid) return false;
    return true;
  }

  props: Props;

  render() {
    const { user } = this.props;
    return (
      <Container className="CurrentUser">
        <Photo src={user.picture || user.photoURL} alt={user.name || user.displayName} />
        <Identification>
          <h3>
            {user.name || user.displayName}
          </h3>
          <p>
            {user.email}
          </p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </Identification>
      </Container>
    );
  }
}

export default CurrentUser;
