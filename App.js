import React from 'react';
import PropTypes from "prop-types";
import { Constants } from 'expo';

import {
  StyleSheet,
  View,
  Platform,
  Modal,
  AsyncStorage, //a simple key-value store provided by React Native for storing small quantities of string data. saving and reading from this store both happen asynchronously
} from 'react-native';

import Feed from './screens/Feed';
import Comments from './screens/Comments';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default class App extends React.Component {
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null, //id of img we're storing comments for
  };

  async componentDidMount() {
    try {
      const commentsForItem = await AsyncStorage.getItem( //getItem means retrieving data from storage
        ASYNC_STORAGE_COMMENTS_KEY,
      );

      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
      });
    } catch (e) {
      console.log('failed to load comments, message:', e)
    }
  }

  openCommentScreen = id => { //we need to call this from within CardList in order to pass the ID. then we propogate the value thru Feed and up to App. Data is stored as stringified JSON, therefore when we store it we must stringify (serialize) it, and when we retrieve it, we must parse it.
    this.setState({
      showModal: true,
      selectedItemId: id,
    });
  };

  closeCommentScreen = () => {
    console.log("before", this.state)
    this.setState({
      showModal: false,
      selectedItemId: null,
    });
    console.log("after", this.state)
  };

  onSubmitComment = (text) => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || []
    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    this.setState({ commentsForItem: updated })

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated)); //setItem means putting data into storage
    } catch(e) {
      console.log(`failed to save comment ${text} for ${selectedItemId}`); //Note that getItem and setItem can both fail (e.g. when disk I/O fails), so we need to wrap any async calls in try/catch .
    }
  };

  render() {
    const { commentsForItem, showModal, selectedItemId } = this.state;
    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.openCommentScreen}
        />
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            style={styles.container}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1, //We can use flex to adapt our layout to different screen sizes. The flex attribute of a component determines only its dimension along the primary axis
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  comments: {
    flex: 1,
    marginTop: Platform.OS === 'ios' && platformVersion < 11 ? Constants.statusBarHeight : 0 //if it is iOS and below version 11. modals naturally sit below status bar on Android

  }
});
