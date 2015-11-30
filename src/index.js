'use strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import YoutubePlayer from './youtubePlayer';

class SongThumb extends Component {
	render() {
		return (
			<div>
				<img src={this.props.thumbnailUrl} />
				<span className="title">{this.props.title}</span>
				<span className="votes">{this.props.votes}</span>
			</div>
		)
	}
}

class PlayList extends Component {
	render() {
		var songThumbs = [];
		songThumbs = this.props.songs.map(song => 
			<SongThumb thumbnailUrl={song.thumbnailUrl} title={song.title} votes={song.votes} />
		);

		return (
      <div>{songThumbs.length === 0 ? "No songs where loaded" : songThumbs}</div>
		)
	}
}

class App extends Component {
  state = {
    selectedSongId: '',
    songs: [],
    activeSongIndex: -1
  }
  nextSong() {
    if (this.state.songs.length <= 0) {
      return;
    } 

    var index = (this.state.activeSongIndex + 1) % this.state.songs.length;
    var songId = this.state.songs[index].id;
    this.setState({
        activeSongIndex: index,
        selectedSongId: songId
    });
  }
  componentDidMount() {
    $.get("http://redux101.500tech.com/playlists/redux101", (result) => {
      this.setState({
        songs: result.songs
      });
      this.nextSong();
    });
  }
  _onEnd() {
    this.nextSong();
  }
  render() {
    return (
    	<div>
      	<h1>500Tech Player</h1>
      	<div>
      		<YoutubePlayer videoID={this.state.selectedSongId} onEnd={this._onEnd.bind(this)}/>
      	</div>
      	<div>
      		<PlayList songs={this.state.songs}/>
      	</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
