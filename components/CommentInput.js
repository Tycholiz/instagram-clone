import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TextInput,
	StyleSheet,
} from 'react-native';
import { } from 'expo';

export default class CommentInput extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
	};

	static defaultProps = {
		placeholder: 'Leave a comment', //in pdf, this is left blankd
	};

	state = {
		text: '',
	};

	handleChangeText = text => {
		this.setState({ text });
	};

	handleSubmitEditing = () => {
		const { onSubmit } = this.props;
		const { text } = this.state;

		if (!text) return; //not accepting empty comments

		onSubmit(text);
		this.setState({ text: '' });
	};

	render() {
		const { placeholder } = this.props;
		const { text } = this.state;

		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					value={text}
					placeholder={placeholder}
					underlineColorAndroid="transparent"
					onChangeText={this.handleChangeText} //pass state management methods to TextInput
					onSubmitEditing={this.handleSubmitEditing}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: StyleSheet.hairlineWidth, //render thinnest line possible
		borderBottomColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: 20,
		height: 60,
	},
	input: {
		flex: 1,
	},
});
