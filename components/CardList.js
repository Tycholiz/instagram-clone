import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
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
		).isRequired,
		commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
			.isRequired,
		onPressComments: PropTypes.func.isRequired,
	};

	//Each time the FlatList decides to render a new item, it will call the renderItem function we provide
	renderItem = ({ item: { id, author } }) => { //object destructuring on 'items' object passed from App.js
		const { commentsForItem, onPressComments } = this.props;
		const comments = commentsForItem[id];

		return (
			<Card
				fullname={author}
				image={{
					uri: getImageFromId(id),
				}}
				linkText={`${comments ? comments.length : 0} Comments`}
				onPressLinkText={() => onPressComments(id)}
			/>
		);
	};

	render() {
		const { items, commentsForItem } = this.props;

		return (
			<FlatList
				data={items}
				renderItem={this.renderItem}
				keyExtractor={keyExtractor}
				extraData={commentsForItem} //the count of comments we use for the linkText won’t immediately update when we add new comments.This is due to how the FlatList decides whether or not to re-render items; the FlatList will only re-render an item when the data prop changes or when scrolling.In this case, we pass the items prop of CardList into the data prop of FlatList , but our commentsForItem prop doesn’ t cause the items array to change, so the FlatList won’ t update when new comments are added.We can use the prop extraData of FlatList to inform the FlatList that it should monitor another source of input data for changes
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
