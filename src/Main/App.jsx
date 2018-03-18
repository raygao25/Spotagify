/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import logo from '../Other/logo.svg';
import './App.css';
import Main from './Main.container';


const client_id = 'c0d13380ce1c4c7b9a9438b9bd5f8cb9';
const redirect_uri = 'http://localhost:3000/index.html';


// class Playlist extends Component {
//     constructor() {
//         super();
//         this.state = {
//             showTracks: false,
//         };
//     }
//     render() {
//         let lst = this.props.list;
//         return (
//             <div className="Playlist">
//                 {this.props.name}
//                 <button className="Playlistbtn"  onClick={() => {this.setState({showTracks: !this.state.showTracks})}}>
//                     {">"}
//                 </button>
//                 {
//                     this.state.showTracks ?
//                         <ol>
//                             {this.props.list.map(function(listValue){
//                                 return <li> {listValue} </li>;
//                             })}
//                         </ol>
//                         : null
//                 }
//             </div>
//         );
//     }
// }

// class Head extends Component {
//     render() {
//         return (
//             <div className="Head">
//                 <div className="Head-header">
//                     <img src={logo} className="Head-logo" alt="logo" />

//                 </div>
//             </div>
//         );
//     }
// }
/** */
class Greeting extends Component {
	/** */
	constructor() {
		super();
		this.state = {
			// isLoggedIn: sessionStorage.getItem('Loggedin')
		};
	}
	/** */
	login() {
		const url = `https://accounts.spotify.com/authorize?client_id=${client_id
		}&response_type=token` +
            '&scope=playlist-read-private' +
            `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
		// sessionStorage.setItem('Loggedin', true);
		window.location = url;
	}
	/** */
	start(args) {
		const hash = window.location.hash.replace(/#/g, '');
		const all = hash.split('&');
		all.forEach((keyvalue) => {
			const idx = keyvalue.indexOf('=');
			const key = keyvalue.substring(0, idx);
			const Value = keyvalue.substring(idx + 1);
			args[key] = Value;
		});
	}
	/** */
	render() {
		const args = {};
		this.start(args);
		// alert(args['access_token']);
		if (typeof (args.access_token) === 'undefined') {
			return (
				<div>
					<button className="loginbtn" onClick={() => this.login()}>
                        Log in
					</button>
				</div>
			);
		}
		// g_access_token = args['access_token'];
		return (<Main g_access_token={args.access_token} />);
	}
}

export default Greeting;
