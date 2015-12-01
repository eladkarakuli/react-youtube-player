'use strict'

var css = require('style!./youtube-player.css').Promise;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayList from './playlist';

import YoutubePlayer from './youtubePlayer';

class App extends Component {
  setSong(index, id) {
    this.setState({
      activeSongIndex: index,
      selectedSongId: id
    });
  }
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
    this.setSong(index, songId);
  }
  componentDidMount() {
    $.get("http://redux101.500tech.com/playlists/redux101", (result) => {
      this.setState({
        songs: result.songs
      });
      this.nextSong();
    });
  }
  _onEnd = () => {
    this.nextSong();
  }
  handelSelecteSong = (songId) => {
    let index = this.state.songs.findIndex(song => song.id === songId);
    this.setSong(index, songId);
  }
  render() {
    return (
    	<div>
      	<h1>500Tech Player</h1>
      	<div>
      		<YoutubePlayer videoID={this.state.selectedSongId} onEnd={this._onEnd.bind(this)}/>
      	</div>
      	<div>
      		<PlayList songs={this.state.songs} onSongSelected={this.handelSelecteSong.bind(this)}/>
      	</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
