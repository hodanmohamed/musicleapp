import './App.css';

import SearchButton from '../SearchButton/SearchButton';
import LikedSongs from '../LikedSongs/LikedSongs';
import Playlist from '../Playlist/Playlist';
import Footer from '../Footer/Footer';
import Spotify from '../../util/Spotify';

import React from 'react';
Spotify.getAccessToken();

class App extends React.Component { // Class component

  constructor(props) { // constructor function within this app.js component to pull in props from the react component class
    super(props);

    this.state = { // this.state.searchResults will be an array containing track objects (will have the properties)
      searchResults: [],

      playlistName: 'Musicle Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this); // binds the current value of this to .addTrack()
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) { // accepts a track argument 
    let tracks = this.state.playlistTracks;

    if (tracks.find(savedTrack => savedTrack.id === track.id)) { // checks to see if the track is already in the array of saved tracks
      return; // if already saved, return
    }

    tracks.push(track); // else push track into the tracks array of objects
    this.setState({ playlistTracks: tracks }) // update the state of playlist tracks
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name }); // sets the state of the playlist name to the new playlist name
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Musicle Playlist',
        playlistTracks: []
      })
    });
  }

 

  search() {
    Spotify.search().then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  render() { // Render method to return the components (what should appear on screen)
    return (
      <div className="App">
        <SearchButton onSearch={this.search} />
        <div className="App-playlist">
          <LikedSongs searchResults={this.state.searchResults} onAdd={this.addTrack} /> {/* pass .addTrack method to the LikedSongs component as an onAdd attribute */}
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;