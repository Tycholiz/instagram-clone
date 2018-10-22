import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
	ColorPropType,
	View,
	Text,
	StyleSheet,
} from 'react-native';

export default function Avatar({ size, backgroundColor, initials }) {
	const style = { //we define the styles here because this is a dynamic comp., meaning that the styles it receives will be different all the time. we don't need a stylesheet for these kind of components
		width: size,
		height: size,
		borderRadius: size / 2,
		backgroundColor,
	}

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.initials}>{initials}</Text>
		</View>
	)
}

Avatar.propTypes = {
	initials: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
	backgroundColor: ColorPropType.isRequired,
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	initials: {
		color: 'white',
		fontSize: 20,
	}
});