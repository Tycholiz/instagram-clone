import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	ActivityIndicator,
	ViewPropTypes,
	SafeAreaView,
} from 'react-native';

import { fetchImages } from '../utils/api';
import CardList from '../components/CardList';

export default class Feed extends Component {
	static propTypes = {
		style: ViewPropTypes.style,
		commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
			.isRequired,
		onPressComments: PropTypes.func.isRequired,
	};

	static defaultProps = {
		style: null,
	};

	state = {
		loading: true,
		error: false,
		items: [],
	};

	async componentDidMount() { //We made componentDidMount an async function so that we can use the await syntax within it (therefore the fn will return a promise). this is ok since react doesn't use the return value of componentDidMount
		try {
			const items = await fetchImages();

			this.setState({
				loading: false,
				items,
			});
		} catch (e) {
			this.setState({
				loading: false,
				error: true,
			});
		}
	}

	render() {
		const { style, commentsForItem, onPressComments } = this.props;
		const { loading, error, items } = this.state;

		if (loading) {
			return <ActivityIndicator size="large" />
		}

		if (error) {
			return <Text>Error...</Text>
		}

		return (
			//automatically applies paddings to reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views
			<SafeAreaView style={style}>
				<CardList
					items={items}
					commentsForItem={commentsForItem}
					onPressComments={onPressComments}
				/>
			</SafeAreaView>
		);
	}
}
