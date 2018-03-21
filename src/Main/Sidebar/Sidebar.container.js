import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getPlaylists,
	showPlaylist,
} from '../Reducers/App.actions';
import sidebar from './Sidebar';

/** */
const mapStateToProps = (state) => ({
	playlists: state.playlists.playlistData,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	getPlaylists: getPlaylists.start,
	showPlaylist,
}, dispatch);

const Sidebar = connect(
	mapStateToProps,
	mapDispatchToProps
)(sidebar);

export default Sidebar;
