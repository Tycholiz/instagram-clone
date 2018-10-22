import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	View,
	StyleSheet,
	Image,
	ActivityIndicator,
} from 'react-native';

import { } from 'expo';
import AuthorRow from './AuthorRow';

export default class Card extends Component {
	static propTypes = {
		fullname: PropTypes.string.isRequired,
		image: Image.propTypes.source.isRequired,
		linkText: PropTypes.string,
		onPressLinkText: PropTypes.func,
	};

	static defaultProps = {
		linkText: '',
		onPressLinkText: () => { },
	};

	state = {
		loading: true,
	};

	handleLoad = () => {
		this.setState({
			loading: false,
		});
	};

	render() {
		const { fullname, image, linkText, onPressLinkText } = this.props;
		const { loading } = this.state;

		return (
			<View>
				<AuthorRow
					fullname={fullname}
					linkText={linkText}
					onPressLinkText={onPressLinkText}
				/>
				<View style={styles.image}>
					{loading && (
						<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} /> //absoluteFill = top: 0, bottom: 0, left: 0, right: 0, position: absolute
					)}
					<Image //we want image after activityindicator because that means it will be on top of it.
						style={StyleSheet.absoluteFill}
						source={image}
						onLoad={this.handleLoad}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1, //this makes the picture a square
		backgroundColor: 'rgba(0,0,0,0.2)', //this will show before the image loads as a kind of placeholder
	},
});
