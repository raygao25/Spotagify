import React from 'react';
import PropTypes from 'prop-types';
import { Icon, List, Divider, Header, Image, Dropdown } from 'semantic-ui-react';

import TagModal from '../Modal/TagModal.container';

/** */
const FiltersDropDown = (props) => (
	<Dropdown
		text="Filters"
		icon="filter"
		floating
		labeled
		button
		scrolling
		direction="left"
		className="FiltersDropDown"
		style={{
			float: 'right',
			marginRight: '20px',
			marginTop: '33px',
			verticalAlign: 'middle',
		}}
	>
		<Dropdown.Menu>
			<Dropdown.Header icon="tags" content="Filter by tag" />
			<Dropdown.Divider />
			<Dropdown.Item onClick={() => props.openTagModal()}>Manage tags</Dropdown.Item>
			<Dropdown.Item>R&B</Dropdown.Item>
			<Dropdown.Item>Rap</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
);

/** */
const MainPanelList = (props) => {
	const { playlist } = props;
	return (
		<List ordered style={{ marginLeft: '60px' }}>
			{playlist && playlist.tracks && playlist.tracks.map((track) => (
				<List.Item key={track.id}>
					<Icon name="video play" link onClick={() => console.log(track.name, ' clicked')} />
					<Icon name="ellipsis horizontal" style={{ float: 'right' }} />
					<List.Content>
						<List.Header onClick={() => console.log(track.name, ' clicked')}>{track.name}</List.Header>
						<List.Description>
							{track.artists.reduce((acc, cur) => (`${acc}, ${cur}`), '').substring(2)}
							{' • '}
							{track.album.name}
							{' • '}
							{track.relaeseDate}
						</List.Description>
					</List.Content>
					<Divider />
				</List.Item>
			))}
		</List>);
};

/**
 * Component to render sidebar
 */
const MainPanel = (props) => {
	const { playlist, tagModalOn, openTagModal } = props;
	return (
		<div className="MainPanel">

			<div>
				<Header as="h2" style={{ marginLeft: '30px', marginTop: '20px' }}>
					{playlist &&
					<Image circular src="https://i.scdn.co/image/3e8a2e1fbbe498621d012419c81bcc418fc927dd" />}
					{playlist && ` ${playlist.name}`}
					<FiltersDropDown openTagModal={openTagModal} />
					{tagModalOn && <TagModal />}
				</Header>
				<Divider />
			</div>

			{/* {playlist &&
			<Sticky>
				<iframe
					src="https://open.spotify.com/embed?uri=spotify:track:1jEAOrekJF0h2Rvf6mpCLd"
					title="spotifyPlayer"
					width="600"
					height="80"
					frameBorder="0"
					allowTransparency="true"
					allow="encrypted-media"
				/>
			</Sticky>
			} */}
			<MainPanelList playlist={playlist} />
		</div>);
};

FiltersDropDown.propTypes = {
	openTagModal: PropTypes.func,
};

MainPanelList.propTypes = {
	playlist: PropTypes.shape(),
};

MainPanel.propTypes = {
	playlist: PropTypes.shape(),
	tagModalOn: PropTypes.bool,
	openTagModal: PropTypes.func,
};

export default MainPanel;
