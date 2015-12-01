import React, { Component } from 'react';

export default class SongThumb extends Component {
	render() {
		return (
			<div className="songThumb">
				<img src={this.props.thumbnailUrl} />
				<span className="title">{this.props.title}</span>
				<span className="votes">{this.props.votes}</span>				
			</div>
		)
	}
}