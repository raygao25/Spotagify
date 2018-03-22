import makeActionCreator from 'make-action-creator';

export const initialLoad = makeActionCreator('INITIAL_LOAD');

export const loadTags = makeActionCreator('LOAD_TAGS');

export const postTags = makeActionCreator('POST_TAGS');

export const deleteTags = makeActionCreator('DELETE_TAGS');

export const getPlaylists = makeActionCreator('LOAD_PLAYLISTS');

export const setPlaylists = makeActionCreator('SET_PLAYLISTS');

export const setTracks = makeActionCreator('SET_TRACKS');

export const showPlaylist = makeActionCreator('SHOW_PLAYLIST');

export const openTagModal = makeActionCreator('SHOW_TAG_MODAL');

export const closeTagModal = makeActionCreator('CLOSE_TAG_MODAL');

export const setUserInfo = makeActionCreator('SET_USER_INFO');

export const addTag = makeActionCreator('ADD_TAG');

export const removeTag = makeActionCreator('REMOVE_TAG');

export const saveTagChanges = makeActionCreator('SAVE_TAG_CHANGES');

export const discardTagChanges = makeActionCreator('DISCARD_TAG_CHANGES');
