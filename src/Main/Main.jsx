/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar/Sidebar.container';
import MainPanel from './MainPanel/MainPanel.container';

/**
 * Main component
*/
class Main extends Component {
	// getPlaylist() {
	// 	const lst = {};
	// 	const track = {};
	// 	fetch('https://api.spotify.com/v1/users/meedooo/playlists', {
	// 		headers: {
	// 			Authorization: `Bearer ${this.props.g_access_token}`,
	// 		},
	// 	})
	// 		.then((resp) => resp.json())
	// 		.then((response) => {
	// 			response.items.forEach((item) => {
	// 				lst[item.name] = item.tracks.href;// .push(<li key={item.name}> {item.name} </li>);
	// 				// alert(lst[item.name]);
	// 				track[item.name] = [];
	// 			});
	// 		})
	// 		.then(() => this.setState({ Playlist_Track_herf: lst, Tracks: track }));
	// }
	// getTracks() {
	// 	const lst = this.state.Playlist_Track_herf;
	// 	// alert(lst.length);
	// 	// alert('aaa');
	// 	const tracks = this.state.Tracks;
	// 	Object.keys(lst).map((key) => {
	// 		const herf = lst[key];
	// 		fetch(herf, {
	// 			headers: {
	// 				Authorization: `Bearer ${this.props.g_access_token}`,
	// 			},
	// 		})
	// 			.then((resp) => resp.json())
	// 			.then((response) => {
	// 				response.items.forEach((item) => {
	// 					const name = item.track.name;
	// 					tracks[key].push(name);
	// 				});
	// 			})
	// 			.then(() => this.setState({ Tracks: tracks, PlaylistUpdated: true }));
	// 	});
	// }
	/**
     *
    */
	componentDidMount() {
		this.props.setUserInfo({
			userName: 'meedooo',
			accessToken: this.props.g_access_token,
		});
		this.props.initialLoad();
	}
	/**
     *
    */
	render() {
		// if (!this.state.PlaylistUpdated) this.getPlaylist();
		// if (!this.state.PlaylistUpdated) this.getTracks();
		return (
			<div>
				<Sidebar />
				<div style={{ marginLeft: '15rem' }}>
					<MainPanel />
				</div>
				{/* <Dimmer active>
					<Loader>Loading</Loader>
				</Dimmer> */}
			</div>
		);
	}
}

Main.propTypes = {
	initialLoad: PropTypes.func,
	setUserInfo: PropTypes.func,
	g_access_token: PropTypes.string,
};

export default Main;
