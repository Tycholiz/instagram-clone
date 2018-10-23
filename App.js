import React from 'react';
import PropTypes from "prop-types";
import { Constants } from 'expo';

import {
  StyleSheet,
  View,
  Platform,
  Modal,
} from 'react-native';

import Feed from './screens/Feed';
import Comments from './screens/Comments';

export default class App extends React.Component {
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null, //id of img we're storing comments for
  };

  openCommentScreen = id => { //we need to call this from within CardList in order to pass the ID. then we propogate the value thru Feed and up to App.
    this.setState({
      showModal: true,
      selectedItemId: id,
    });
  };

  closeCommentScreen = () => {
    this.setState({
      sowModal: false,
      selectedItemId: false,
    });
  };

  onSubmitComment = (text) => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || []

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };
    this.setState({ commentsForItem: upload })
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
