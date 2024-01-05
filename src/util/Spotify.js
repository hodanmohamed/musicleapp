let accessToken;

const clientId = '81e123b5aa86452abf783c9f9a7399ef';
const redirectUri = 'http://hodanmohamed.github.io/musicleapp';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            
            // this clears the parameters, allowing us to grab the new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // this considers both scopes to read and modify (fixes error)
            let scope = 'user-library-read playlist-modify-public'
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }  
    },
    async search() {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/me/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        const jsonResponse = await response.json();
                
         if (!jsonResponse.items) {
            return [];
        }

        return jsonResponse.items.map(liked => ({
            id: liked.track.id,
            name: liked.track.name,
            artist: liked.track.artists[0].name,
            album: liked.track.album.name,
            uri: liked.track.uri
        }));
    },
    async savePlaylist(name, trackUris) {
        if(!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        const response = await fetch('https://api.spotify.com/v1/me', { headers: headers }
        );

        const jsonResponse = await response.json();
        userId = jsonResponse.id;
        const response_1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name, public: true, description: "A Musicle App Playlist" })
        });
        
        const jsonResponse_1 = await response_1.json();
        const playlistId = jsonResponse_1.id;
    
        return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
        });
    }
}
export default Spotify;