import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

export default function NavigationBar({ title, leftText, onPressLeftText }) {
	return (
		<View style={styles.container}>
			<Text>NavigationBar</Text>
		</View>
	);
}

NavigationBar.propTypes = {
	title: PropTypes.string,
	leftText: PropTypes.string,
	onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
	title: '',
	leftText: '',
	onPressLeftText: () => { },
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
