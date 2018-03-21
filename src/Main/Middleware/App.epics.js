import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
	initialLoad,
	loadTags,
	getPlaylists,
	setPlaylists,
	setTracks,
} from '../Reducers/App.actions';

/**
 * Returns an observable to fetch playlists
 */
const fetchObservable = (url, token) => {
	const observable = Observable.create((observer) => {
		fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((result) => result.json())
			.then((json) => {
				observer.next(json);
			})
			.catch((err) => {
				observer.error(err);
			});
	});
	return observable;
};


/* --------------------------------------EPICS-------------------------------------- */

/**
 * Epic for initial load
 */
const initialLoadEpic = (action$) =>
	action$.ofType(initialLoad.type)
		.mergeMap(() =>
			of(getPlaylists.start())
				.concat(of(loadTags.start())));

/**
 * Epic to load tags
 */
const loadTagsEpic = (action$) =>
	action$.ofType(loadTags.START)
		.mergeMap(() =>
			ajax.getJSON('api/tags')
				.map((result) => loadTags.success(result))
				.catch((error) => Observable.of({
					type: 'FETCH_TAGS_FAILED',
					payload: error.xhr.response,
					error: true,
				})));

/**
 * Epic to load playlist titles
 */
const getPlaylistsEpic = (action$, store) =>
	action$.ofType(getPlaylists.START)
		.debounceTime(1000)
		.mergeMap(() => {
			const user = store.getState().userInfo.user.userName;
			const token = store.getState().userInfo.user.accessToken;
			const url = `https://api.spotify.com/v1/users/${user}/playlists`;
			return fetchObservable(url, token)
				.map((result) => getPlaylists.success(result));
		});

/** */
const setPlaylistsEpic = (action$) =>
	action$.ofType(getPlaylists.SUCCESS)
		.map((action) => {
			const { payload } = action;
			// console.log(payload);
			const playlistsData = payload.items.map((playlist) => ({
				href: `${playlist.href}/tracks`,
				name: playlist.name,
				id: playlist.id,
			}));
			return setPlaylists(playlistsData);
		});

/** */
const getTracksEpic = (action$, store) =>
	action$.ofType(setPlaylists.type)
		.mergeMap((action) => {
			const { payload } = action;
			const token = store.getState().userInfo.user.accessToken;
			return Observable.create((observer) => {
				payload.forEach((element) => {
					fetchObservable(element.href, token)
						.map((result) => {
							// console.log(result);
							const tracks = result.items.map((trackObj) => ({
								album: {
									id: trackObj.track.album.id,
									name: trackObj.track.album.name,
								},
								artists: trackObj.track.artists.map((artist) => artist.name),
								uri: trackObj.track.uri,
								// href: trackObj.track.href,
								id: trackObj.track.id,
								name: trackObj.track.name,
								popularity: trackObj.track.popularity,
								relaeseDate: trackObj.track.album.release_date,
								year: trackObj.track.album.release_date ? parseInt(trackObj.track.album.release_date.substring(0, 4), 10) : null,
								image: trackObj.track.album.images[0].url,
							}));
							const tracksPayload = { playlistId: element.id, tracks };
							observer.next(setTracks(tracksPayload));
							return {};
						})
						.subscribe();
				});
			});
		});

const rootEpic = combineEpics(
	initialLoadEpic,
	loadTagsEpic,
	getPlaylistsEpic,
	setPlaylistsEpic,
	getTracksEpic,
);

export default rootEpic;
