import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from './Reducers/App.actions';
import Main from './Main';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	loadPlaylists: action.loadPlaylists.start,
	setUserInfo: action.setUserInfo,
}, dispatch);

const mainContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);

export default mainContainer;
