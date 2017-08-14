// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import FileInput from 'react-file-input';

import { storage, database } from '../firebase';

type Props = {
  user: User,
  uid: string
};

const Container = styled.article`
  border: 1px solid #eee;
  text-align: center;
  padding: 1em;
  margin: 1em;

  & img {
    max-width: 200px;
    min-height: 200px;
    display: block;
  }
`;

class ProfileCard extends Component {
  handleSubmit = async (event: SyntheticEvent & { target: HTMLInputElement }) => {
    const [file: File] = event.target.files;
    if (this.storageRef) {
      const uploadTask = this.storageRef.child(file.name).put(file, { contentType: file.type });

      uploadTask.on('state_changed', _snap => {
        console.log(_snap.bytesTransferred / _snap.totalBytes * 100);
      });

      const snap = await uploadTask;
      this.userRef.child('photoURL').set(snap.downloadURL);
    }
  };

  // because of srr firebase.storage() doesn't exist on the server
  storageRef = storage ? storage.ref('/user-images').child(this.props.uid) : null;
  userRef = database.ref('users').child(this.props.uid);

  props: Props;

  render() {
    const { user: { photoURL, displayName } } = this.props;

    return (
      <Container>
        <img src={photoURL} alt={displayName} />
        <h3>
          {displayName}
        </h3>
        <FileInput accept=".png,.gif,.jpg" placeholder="Select an image" onChange={this.handleSubmit} />
      </Container>
    );
  }
}
export default ProfileCard;
