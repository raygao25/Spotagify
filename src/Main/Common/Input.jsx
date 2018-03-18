import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';


/**
 * Customized Input based on semantic-ui Input
*/
class MyInput extends React.Component {
	/**
     * Set initial states
     */
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	/**
     * Invoked after component is mounted
     */
	componentDidMount() {
		if (this.inputRef) {
			this.inputRef.focus();
		}
	}

	/**
     * Render method
     */
	render() {
		const {
			icon, placeholder, onKeyDown, style,
		} = this.props;
		return (
			<Input
				value={this.state.value}
				icon={icon}
				placeholder={placeholder}
				onKeyDown={(value) => {
					onKeyDown(value);
					if (value.key === 'Enter' || value.key === 'Tab') {
						this.setState({
							value: '',
						});
					}
				}}
				onChange={(value) => {
					this.setState({
						value: value.target.value,
					});
				}}
				ref={(innerRef) => {
					this.inputRef = innerRef;
				}}
				style={style}
			/>
		);
	}
}

MyInput.propTypes = {
	icon: PropTypes.string,
	placeholder: PropTypes.string,
	onKeyDown: PropTypes.func,
	style: PropTypes.shape(),
};

export default MyInput;
