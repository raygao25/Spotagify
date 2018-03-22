import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import Input from '../Common/Input';

/**
 * A pop up window for tags management
 */
class tagModal extends React.Component {
	/**
     * Invoked after first render
     */
	componentDidMount() {
		if (this.inputRef) {
			this.inputRef.focus();
		}
	}

	/**
     * render
     */
	render() {
		const {
			tags, closeTagModal, addTag, removeTag, saveTagChanges, discardTagChanges,
		} = this.props;
		return (
			<div className="tagModal">
				<Modal
					open
					closeOnDimmerClick={false}
					closeOnEscape={false}
					onClose={() => closeTagModal()}
					style={{
						position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
					}}
				>
					<Modal.Header>Manage tags</Modal.Header>
					<Modal.Content>
						<Input
							icon="plus"
							placeholder="Add a tag"
							onKeyDown={(v) => {
								if (v.key === 'Enter' || v.key === 'Tab') {
									const { value } = v.target;
                                    if (!!value) { // eslint-disable-line
										addTag(value);
									}
								}
							}}
							style={{ width: '100%' }}
						/>
						{!isEmpty(tags) && Object.keys(tags).map((key) => (
							tags[key] &&
							<Button
								content={key}
								icon="remove"
								labelPosition="right"
								onClick={() => removeTag(key)}
								key={key}
							/>
						))}
					</Modal.Content>
					<Modal.Actions>
						<Button
							negative
							onClick={() => {
								discardTagChanges();
								closeTagModal();
							}}
						>Cancel
						</Button>
						<Button
							positive
							onClick={() => {
								saveTagChanges();
								closeTagModal();
							}}
						>Save
						</Button>
					</Modal.Actions>
				</Modal>
			</div>);
	}
}

tagModal.propTypes = {
	tags: PropTypes.shape(),
	closeTagModal: PropTypes.func.isRequired,
	addTag: PropTypes.func.isRequired,
	removeTag: PropTypes.func.isRequired,
	saveTagChanges: PropTypes.func.isRequired,
	discardTagChanges: PropTypes.func.isRequired,
};

export default tagModal;
