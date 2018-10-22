import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import getInitials from '../utils/getInitials.js';
import getAvatarColor from '../utils/getAvatarColor.js';

import Avatar from './Avatar';

export default function AuthorRow({ fullname, linkText, onPressLinkText }) {
	return (
		<View style={styles.container}>
			<Avatar
				size={35}
				initials={getInitials(fullname)}
				backgroundColor={getAvatarColor(fullname)}
			/>
			<Text style={styles.text} numberOfLines={1}>
				{fullname}
			</Text>
			{!!linkText && ( //The double negation with '!!' lets us make sure we’re dealing with a boolean value.
				<TouchableOpacity onPress={onPressLinkText}>
					<Text numberOfLines={1}>{linkText}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

AuthorRow.propTypes = {
	fullname: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired,
	onPressLinkText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	text: {
		flex: 1, //We use flex: 1 so that Text expands to fill any remaining space in the View . This will push the TouchableOpacity to the right side.
		marginHorizontal: 6,
	}
});
