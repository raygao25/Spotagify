import { combineReducers } from 'redux';
import { keyBy } from 'lodash';
import {
	setUserInfo,
	getPlaylists,
	setPlaylists,
	setTracks,
	showPlaylist,
	openTagModal,
	closeTagModal,
	addTag,
	removeTag,
	saveTagChanges,
	discardTagChanges,
	loadTags,
} from './App.actions';


const initialPlalists = {
	playlistData: {},
};

/**
 * Reducer for user information
 */
const userInfo = (state = {}, action) => {
	const { payload } = action;
	switch (action.type) {
		case setUserInfo.type:
			return {
				...state,
				user: {
					userName: payload.userName,
					accessToken: payload.accessToken,
				},
			};
		default:
			return state;
	}
};

/**
 * Reducer for playlists
 */
const playlists = (state = initialPlalists, action) => {
	const { payload } = action;
	switch (action.type) {
		case setPlaylists.type:
			return {
				...state,
				playlistData: {
					...state.playlistData,
					...keyBy(payload, 'id'),
				},
			};
		case setTracks.type:
			// const { playlistId, tracks } = payload; // eslint-disable-line
			return {
				...state,
				playlistData: {
					...state.playlistData,
					[payload.playlistId]: {
						...state.playlistData[payload.playlistId],
						tracks: payload.tracks,
					},
				},
			};
		case showPlaylist.type:
			return {
				...state,
				currentPlaylist: payload,
			};
		case getPlaylists.START:
		default:
			return state;
	}
};

const initialTagState = {
	tagList: {},
	lastSavedTagList: {},
	tagModalOn: false,
};


/* eslint-disable no-case-declarations */

/**
 * Tag reducer
 */
const tag = (state = initialTagState, action) => {
	const { payload } = action;
	switch (action.type) {
		case loadTags.SUCCESS:
			return {
				...state,
				tagList: {
					...keyBy(payload, 'name'),
				},
				lastSavedTagList: {
					...keyBy(payload, 'name'),
				},
			};
		case openTagModal.type:
			return {
				...state,
				tagModalOn: true,
			};
		case closeTagModal.type:
			return {
				...state,
				tagModalOn: false,
			};
		case addTag.type:
			return {
				...state,
				tagList: {
					...state.tagList,
					[payload]: true,
				},
			};
		case removeTag.type:
			const { tagList: { [payload]: toRemove, ...toRemain } } = state;
			return {
				...state,
				tagList: {
					...toRemain,
				},
			};
		case saveTagChanges.type:
			return {
				...state,
				lastSavedTagList: { ...state.tagList },
			};
		case discardTagChanges.type:
			return {
				...state,
				tagList: { ...state.lastSavedTagList },
			};
		default:
			return state;
	}
};

const mainReducer = combineReducers({
	playlists,
	userInfo,
	tag,
});

export default mainReducer; // eslint-disable-line
