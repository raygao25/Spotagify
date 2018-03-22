import { combineEpics } from 'redux-observable';
import { of } from 'rxjs/observable/of';

import {
	initialLoad,
	loadTags,
	getPlaylists,
} from '../Reducers/App.actions';

import tagEpic from './Tag.epics';
import playlistEpic from './Playlist.epics';


/**
 * Epic for initial load
 */
const initialLoadEpic = (action$) =>
	action$.ofType(initialLoad.type)
		.mergeMap(() =>
			of(getPlaylists.start())
				.concat(of(loadTags.start())));


const rootEpic = combineEpics(
	initialLoadEpic,
	tagEpic,
	playlistEpic,
);

export default rootEpic;
