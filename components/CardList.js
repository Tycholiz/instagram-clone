import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';
import { } from 'expo';

import Card from './Card'
import { getImageFromId } from '../utils/api'

const keyExtractor = ({ id }) => id.toString(); //We’ll need to provide a function to the FlatList which maps each element in our data array to its unique key

export default class CardList extends Component {
	static propTypes = {
		items: PropTypes.arrayOf( //We can use PropTypes.array() to validate an array, passing the type of the element.
			PropTypes.shape({ //We can use PropTypes.shape() to validate an object, passing the keys of the values we want to validate
				id: PropTypes.number.isRequired,
				author: PropTypes.string.isRequired,
			}),
		).isRequired
	};

	renderItem = ({ item: { id, author } }) => ( //object destructuring on 'items' object passed from App.js
		<Card
			fullname={author}
			// image={{
			// 	uri: getImageFromId(id),
			// }}
			image={{ uri: "https://picsum.photos/300/300?image=0" }}
		/>
	);

	render() {
		const { items } = this.props;

		return (
			<FlatList
				data={items}
				renderItem={this.renderItem}
				keyExtractor={keyExtractor}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
