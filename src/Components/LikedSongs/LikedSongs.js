import React from 'react';
import './LikedSongs.css';

import TrackList from '../TrackList/TrackList'

class LikedSongs extends React.Component { // Liked Songs class component
    render() {
        return (
            <div className="LikedSongs">
            <h2>Your Liked Songs</h2>
            <p className="sideInfo">-</p>
            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} /> {/* passes the liked songs component to the tracklist component */}
            </div>
        );
    }
}

export default LikedSongs;