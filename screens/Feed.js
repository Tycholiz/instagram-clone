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
		const { style } = this.props;
		const { loading, error, items } = this.state;

		if (loading) {
			return <ActivityIndicator size="large" />
		}

		if (error) {
			return <Text>Error...</Text>
		}

		return (
			<SafeAreaView style={style}>
				<CardList items={items} />
			</SafeAreaView>
		);
	}
}
