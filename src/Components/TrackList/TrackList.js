import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component { // Tracklist class component
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {  // map method to that renders a set of track components 
                        return <Track track={track} 
                            key={track.id}
                            onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                    })
                }
            </div>
        );
    }
}

export default TrackList;