import React from 'react';
import './SearchButton.css'; // import css file from same directory
import { FaSpotify } from 'react-icons/fa'; // import react icon


class SearchButton extends React.Component { // Search Button class component
    constructor(props) {
        super(props);

       /*this.state = { // state object
            term: ''
        }*/

        this.search = this.search.bind(this);
        //this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
       // this.props.onSearch(this.state.term);
       this.props.onSearch();
    }

    /*handleTermChange(event) {
        this.setState({term: event.target.value});
    }*/

    render() { // render method to return HTML
        return (
            <div className="SearchBar">
                <h1>musicle.</h1>
                {/*<input placeholder="Enter A Song, Album, or Artist" type="hidden" onChange={this.handleTermChange} />*/}

                <button className="SearchButton" onClick={this.search}>
                    <span>SEARCH</span>
                    <div className="icon"><FaSpotify  size="35px"/></div>
                </button>
            </div>
        );
    }
}

export default SearchButton;
