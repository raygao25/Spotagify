import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openTagModal } from '../Reducers/App.actions';
import mainPanel from './MainPanel';

/** */
const mapStateToProps = (state) => ({
	playlist: state.playlists.currentPlaylist ? state.playlists.playlistData[state.playlists.currentPlaylist] : null,
	tagModalOn: state.tag.tagModalOn,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	openTagModal,
}, dispatch);

const MainPanel = connect(mapStateToProps, mapDispatchToProps)(mainPanel);

export default MainPanel;
