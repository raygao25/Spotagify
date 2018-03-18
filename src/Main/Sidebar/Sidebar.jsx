import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Input, Menu, Button, Icon } from 'semantic-ui-react';


/**
 * Component to render sidebar
 */
const Sidebar = (props) => {
	const { playlists } = props;
	return (
		<div className="Sidebar">
			<Menu
				fixed="left"
				vertical
				inverted
				style={{ overflowY: 'scroll' }}
			>
				<Menu.Item>
					<Input icon="search" placeholder="Search song..." />
				</Menu.Item>
				<Menu.Item>
					<b>
                    Playlists
					</b>
					<Icon
						link
						name="refresh"
						onClick={() => props.loadPlaylists()}
					/>
					<Icon
						link
						name="checkmark"
					/>
					<Menu.Menu>
						{!isEmpty(playlists) && Object.keys(playlists).map((id) => (
							<Menu.Item key={id} onClick={() => props.showPlaylist(id)}>
								{playlists[id].name}
							</Menu.Item>))}
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		</div>);
};

Sidebar.propTypes = {
	playlists: PropTypes.shape().isRequired,
	loadPlaylists: PropTypes.func,
};

export default Sidebar;
