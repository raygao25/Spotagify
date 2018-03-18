import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	closeTagModal,
	addTag,
	removeTag,
	saveTagChanges,
	discardTagChanges,
} from '../Reducers/App.actions';
import tagModal from './TagModal';

/** */
const mapStateToProps = (state) => ({
	tags: state.tag.tagList,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	closeTagModal,
	addTag,
	removeTag,
	saveTagChanges,
	discardTagChanges,
}, dispatch);

const TagModal = connect(
	mapStateToProps,
	mapDispatchToProps
)(tagModal);

export default TagModal;
