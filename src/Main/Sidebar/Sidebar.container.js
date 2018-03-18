import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	loadPlaylists,
	showPlaylist,
} from '../Reducers/App.actions';
import sidebar from './Sidebar';

/** */
const mapStateToProps = (state) => ({
	playlists: state.playlists.playlistData,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	loadPlaylists: loadPlaylists.start,
	showPlaylist,
}, dispatch);

const Sidebar = connect(
	mapStateToProps,
	mapDispatchToProps
)(sidebar);

export default Sidebar;
