// @flow

import React from 'react';
import styled from 'styled-components';
import { auth, googleAuthProvider } from '../firebase';

const Container = styled.div``;

const SignIn = () =>
  <Container>
    <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>sign in</button>
  </Container>;

export default SignIn;
