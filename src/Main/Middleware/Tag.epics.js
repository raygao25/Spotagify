import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { ajax } from 'rxjs/observable/dom/ajax';
import { isEmpty } from 'lodash';

import {
	loadTags,
	postTags,
	deleteTags,
	saveTagChanges,
} from '../Reducers/App.actions';

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
 * Epic to save tag changes
 */
const saveTagsEpic = (action$, store) =>
	action$.ofType(saveTagChanges.type)
		.mergeMap(() => {
			const tagsToInsert = Object.values(store.getState().tag.tagsToInsertBuffer);
			const tagsToRemove = Object.keys(store.getState().tag.tagsToRemoveBuffer);
			if (!isEmpty(tagsToInsert)) {
				if (!isEmpty(tagsToRemove)) {
					return of(postTags.start({ payload: tagsToInsert }))
						.concat(of(deleteTags.start({ payload: tagsToRemove })));
				}
				return of(postTags.start({ payload: tagsToInsert }));
			}
			return empty();
		});

/**
 * Epic to post tags
 */
const postTagsEpic = (action$) =>
	action$.ofType(postTags.START)
		.mergeMap((action) =>
			ajax.post('api/tags', action.payload, { 'Content-Type': 'application/json' })
				.map((result) => postTags.success(result))
				.catch((error) => Observable.of({
					type: 'POST_TAGS_FAILED',
					payload: error.xhr.response,
					error: true,
				})));

/**
 * Epic to delete tags
 */
const deleteTagsEpic = (action$) =>
	action$.ofType(deleteTags.START)
		.mergeMap((action) =>
			ajax({
				method: 'DELETE',
				url: 'api/tags',
				body: action.payload,
				headers: { 'Content-Type': 'application/json' },
			})
				.map((result) => deleteTags.success(result))
				.catch((error) => Observable.of({
					type: 'DELETE_TAGS_FAILED',
					payload: error.xhr.response,
					error: true,
				})));

const tagEpic = combineEpics(
	loadTagsEpic,
	saveTagsEpic,
	postTagsEpic,
	deleteTagsEpic,
);

export default tagEpic;
