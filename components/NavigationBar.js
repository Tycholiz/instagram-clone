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
			<TouchableOpacity style={styles.leftText} onPress={onPressLeftText}>
				<Text>{leftText}</Text>
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

NavigationBar.propTypes = { //We won’t use isRequired on our props, since this component would likely be used without some of them, e.g.leftText and onPressLeftText, if we were to add more screens to this app.
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
		height: 40,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(0,0,0,0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontWeight: '500',
	},
	leftText: {
		position: 'absolute', //We’ll position it with position: 'absolute' , since we don’t want the text on the left to push the title off - center(remember, using position: 'absolute' means the component no longer affects other siblings in the layout)
		left: 20,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
	},
});
