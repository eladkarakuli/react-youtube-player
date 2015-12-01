import React, { Component } from 'react';
import SongThumb from './songthumb';

export default class PlayList extends Component {

	propTypes: {
		onSongSelected: React.PropTypes.func.isRequired
	}
	handleClick(id) {
		this.props.onSongSelected(id);	
	}

	render() {
		var songThumbs = [];
		songThumbs = this.props.songs.map(song => 
			<div onClick={this.handleClick.bind(this, song.id)} key={song.id}>
				<SongThumb thumbnailUrl={song.thumbnailUrl} title={song.title} votes={song.votes} />
			</div>
		);

		return (
      <div>{songThumbs.length === 0 ? "No songs where loaded" : songThumbs}</div>
		)
	}
}
