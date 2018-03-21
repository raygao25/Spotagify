import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from './Reducers/App.actions';
import Main from './Main';


/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	initialLoad: action.initialLoad,
	setUserInfo: action.setUserInfo,
}, dispatch);

const mainContainer = connect(
	null,
	mapDispatchToProps
)(Main);

export default mainContainer;
