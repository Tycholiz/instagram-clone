import React from 'react';
import PropTypes from "prop-types";
import { Constants } from 'expo';

import {
  StyleSheet,
  View,
} from 'react-native';

import CardList from './components/CardList'

const items = [
  { id: 0, author: 'Bob Ross' },
  { id: 1, author: 'Chuck Norris' },
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CardList items={items}/>
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
});
